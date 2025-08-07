import path from "path";
import { features } from "./../config/features";
import { type FileEditor } from "./FileEditor";
import type { FeatureConfig, FeatureKey, FileOptions } from "./types";

/**
 * Represents a CLI feature that modifies files in the project.
 * Features can inject, create, copy, or replace content in files.
 */
export class Feature {
  /** Unique identifier for the feature. */
  private featureKey: FeatureKey;

  /** File editor utility for performing file operations. */
  private editor!: FileEditor;

  /**
   * Constructs a new Feature.
   * @param featureKey - Key representing the feature to install.
   */
  constructor(featureKey: FeatureKey) {
    this.featureKey = featureKey;
  }

  /**
   * Assigns the file editor instance to use for file operations.
   * @param editor - Instance of FileEditor.
   */
  setEditor(editor: FileEditor): void {
    this.editor = editor;
  }

  /**
   * Installs the feature by applying each defined file operation.
   * @param projectPath - Absolute path to the root of the target project.
   * @throws If the feature config is not found or any instruction is invalid.
   */
  async install(projectPath: string): Promise<void> {
    const selectedFeature = features.find((f) => f.key === this.featureKey);

    if (!selectedFeature) {
      throw new Error(`Feature config not found for: ${this.featureKey}`);
    }

    for (const mod of selectedFeature.fileOperations) {
      const filePath = path.join(projectPath, mod.file);
      const options: FileOptions | undefined = mod.options;

      switch (mod.type) {
        case "inject": {
          if (!mod.content || !mod.marker) {
            throw new Error(
              `Invalid inject instruction for feature: ${this.featureKey}`,
            );
          }

          await this.editor.injectContent(
            {
              file: mod.file,
              content: mod.content,
              marker: mod.marker,
            },
            options,
          );
          break;
        }

        case "create": {
          if (!mod.content) {
            throw new Error(
              `Missing content for create operation in feature: ${this.featureKey}`,
            );
          }

          await this.editor.createFile(
            {
              file: mod.file,
              content: mod.content,
            },
            options,
          );
          break;
        }

        case "copy": {
          if (!mod.source) {
            throw new Error(
              `Missing source for copy operation in feature: ${this.featureKey}`,
            );
          }

          await this.editor.copyFile(mod.source, mod.file);
          break;
        }

        case "replace": {
          if (!mod.replacer || !mod.search) {
            throw new Error(
              `Invalid replace instruction for feature: ${this.featureKey}`,
            );
          }

          const replacer: string | ((match: string) => string) =
            mod.replacer ?? ((match) => match);

          await this.editor.replaceContent(
            {
              file: mod.file,
              search: mod.search,
              replacer,
            },
            options,
          );
          break;
        }
      }
    }
  }
}
