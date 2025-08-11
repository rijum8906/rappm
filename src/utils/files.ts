import fs from 'fs-extra';
import path from 'path';
import { type BuiltInParserName } from 'prettier';
import prettier from 'prettier';

/**
 * Get a list of all files in a folder (non-recursive).
 * @param folderPath Path to the folder.
 * @param fullPath If true, returns absolute file paths. Otherwise, just file names.
 */
export async function getFileListFromFolder(folderPath: string, fullPath = false): Promise<string[]> {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => (fullPath ? path.join(folderPath, entry.name) : entry.name));
}

/**
 * Recursively copies all files and folders from source to destination.
 * @param src - Source folder path
 * @param dest - Destination folder path
 */
export async function copyFolder(src: string, dest: string): Promise<void> {
  if (!(await fs.pathExists(src))) {
    throw new Error(`Source folder does not exist: ${src}`);
  }

  await fs.copy(src, dest, {
    overwrite: true,
  });
}

export async function formatCode(code: string, parser: prettier.BuiltInParserName = 'babel'): Promise<string> {
  try {
    const formatted = await prettier.format(code, {
      parser,
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
    });

    return formatted;
  } catch (error) {
    console.error('Prettier formatting error:', error);
    return code; // return unformatted code if error occurs
  }
}

// Map file extensions to Prettier parsers
const parserMap: Record<string, BuiltInParserName> = {
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.js': 'babel',
  '.jsx': 'babel',
  '.json': 'json',
  '.css': 'css',
  '.scss': 'scss',
  '.html': 'html',
  '.md': 'markdown',
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.vue': 'vue',
};

/**
 * Returns the Prettier parser name for a given file based on its extension.
 *
 * @param file - The filename or path (e.g. "index.ts" or "/src/main.js")
 * @returns A BuiltInParserName (e.g. "typescript", "babel") or undefined if unsupported
 */
export function getParserFromExtension(file: string): BuiltInParserName | undefined {
  const ext = path.extname(file).toLowerCase();
  return parserMap[ext];
}
