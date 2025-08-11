import fs from 'fs-extra';
import path from 'path';
import type { FileOptions } from './types';
import { formatCode, getParserFromExtension } from './../utils/files';

/**
 * Payload for creating a file with content.
 */
interface CreateFilePayload {
  file: string;
  content: string;
}

/**
 * Payload for injecting content at a marker.
 */
interface InjectFilePayload {
  files: string[];
  content: string;
  marker: string | RegExp;
  position?: 'before' | 'after';
}

/**
 * Payload for replacing content in a file.
 */
interface ReplaceFilePayload {
  files: string[];
  search?: string | RegExp;
  replacer: string | ((match: string, content: string) => string);
}

/**
 * Handles all file-related operations: create, copy, inject, replace.
 */
export class FileEditor {
  /** Absolute path to the root of the project */
  private appDir: string;

  /**
   * @param appDir - The root directory of the target project.
   */
  constructor(appDir: string) {
    this.appDir = appDir;
  }

  /**
   * Creates a file with given content and optionally formats it.
   * @param payload - Contains file path and file content.
   * @param options - Optional formatting options.
   */
  async createFile({ file, content }: CreateFilePayload, options?: FileOptions): Promise<void> {
    const destPath = path.join(this.appDir, file);
    let finalContent = content;

    if (options?.format) {
      const ext = getParserFromExtension(file);
      finalContent = await formatCode(content, ext);
    }

    await fs.outputFile(destPath, finalContent);
  }

  /**
   * Copies a file from a source path to a destination inside the project.
   * @param source - Absolute or relative source file path.
   * @param dest - Destination path within the project.
   */
  async copyFile(source: string, dest: string): Promise<void> {
    const destPath = path.join(this.appDir, dest);
    const content = await fs.readFile(source);
    await fs.outputFile(destPath, content);
  }

  /**
   * Injects content into a file at the specified marker string or RegExp.
   * @param payload - Contains file path, marker, and content to inject.
   * @param options - Optional formatting options.
   * @throws If file or marker is not found.
   */
  async injectContent(
    { files, content, marker, position = 'after' }: InjectFilePayload,
    options?: FileOptions
  ): Promise<void> {
    for (var file of files) {
      const filePath = path.join(this.appDir, file);

      if (!(await fs.pathExists(filePath))) {
        throw new Error(`File not found: ${filePath}`);
      }

      let original = await fs.readFile(filePath, 'utf-8');
      let updated: string;

      if (marker instanceof RegExp) {
        if (!marker.test(original)) {
          throw new Error(`Regex marker not found in ${file}`);
        }

        updated = original.replace(marker, (match) =>
          position === 'before' ? `${content}\n${match}` : `${match}\n${content}`
        );
      } else {
        const index = original.indexOf(marker);
        if (index === -1) {
          throw new Error(`Marker "${marker}" not found in ${file}`);
        }

        updated =
          position === 'before'
            ? original.replace(marker, `${content}\n${marker}`)
            : original.replace(marker, `${marker}\n${content}`);
      }

      if (options?.format) {
        const ext = getParserFromExtension(file);
        updated = await formatCode(updated, ext);
      }

      await fs.outputFile(filePath, updated, 'utf-8');
    }
  }

  /**
   * Replaces content in a file using a search string/regex or a replacement function.
   * @param payload - Contains file path, search pattern, and replacer.
   * @param options - Optional formatting options.
   * @throws If file is not found.
   */
  async replaceContent({ files, search, replacer }: ReplaceFilePayload, options?: FileOptions): Promise<void> {
    for (var file of files) {
      const filePath = path.resolve(this.appDir, file);

      if (!(await fs.pathExists(filePath))) {
        throw new Error(`File not found: ${filePath}`);
      }

      let content = await fs.readFile(filePath, 'utf-8');
      let updated: string;

      if (search) {
        updated = content.replace(search, replacer as any);
      } else {
        updated = (replacer as Function)(content);
      }

      if (options?.format) {
        const ext = getParserFromExtension(file);
        updated = await formatCode(updated, ext);
      }

      await fs.outputFile(filePath, updated, 'utf-8');
    }
  }
}
