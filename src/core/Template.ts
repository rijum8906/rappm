import path from "path";
import { copyFolder } from "./../utils/files";
import { fileURLToPath } from "url";
import { templates } from "./../config/templates";
import { FileEditor } from "./FileEditor";
import type {
  TemplateKey,
  TemplateConfig,
  FileOperation,
  FileOptions,
} from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Template {
  private templateKey: TemplateKey;
  private editor!: FileEditor;
  private projectName!: string;

  constructor(templateKey: TemplateKey) {
    this.templateKey = templateKey;
  }

  setEditor(editor: FileEditor): void {
    this.editor = editor;
  }

  async generate(projectName: string, projectPath: string): Promise<void> {
    this.projectName = projectName;

    const config: TemplateConfig | undefined = templates.find(
      (t) => t.key === this.templateKey,
    );
    if (!config)
      throw new Error(`Template config not found for: ${this.templateKey}`);

    const templateDir = path.resolve(__dirname, config.templatePath);

    // Step 1: copy the template files
    await copyFolder(templateDir, projectPath);

    // Step 2: perform content replacements
    for (const mod of config.fileOperations) {
      const options: FileOptions | undefined = mod.options;
      if (mod.type === "replace") {
        if (!mod.replacer || !mod.search) {
          throw new Error(
            `Invalid replace instruction for template: ${this.templateKey}`,
          );
        }

        var replacer: string | ((match: string) => string) =
          mod.replacer ?? ((match) => match);

        if (replacer === "project_name") replacer = this.projectName;

        await this.editor.replaceContent(
          {
            file: mod.file,
            search: mod.search,
            replacer,
          },
          options,
        );
      }
    }
  }
}
