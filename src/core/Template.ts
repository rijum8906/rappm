import path from 'path';
import { execa } from 'execa';
import { copyFolder } from './../utils/files';
import { fileURLToPath } from 'url';
import { templates } from './../config/templates';
import { FileEditor } from './FileEditor';
import type { TemplateKey, TemplateConfig, FileOperation, FileOptions } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Template {
  private templateKey: TemplateKey;
  private editor!: FileEditor;
  private projectName!: string;
  private appDir!: string;

  constructor(templateKey: TemplateKey) {
    this.templateKey = templateKey;
  }

  setEditor(editor: FileEditor): void {
    this.editor = editor;
  }

  async generate(projectName: string, appDir: string): Promise<void> {
    this.projectName = projectName;
    this.appDir = appDir;

    const templateConfig: TemplateConfig | undefined = templates.find((t) => t.key === this.templateKey);
    if (!templateConfig) throw new Error(`Template config not found for: ${this.templateKey}`);

    const templateDir = path.resolve(__dirname, templateConfig.templatePath);

    // Step 1: copy the template files
    await copyFolder(templateDir, appDir);

    // Step 2: perform content replacements
    for (const mod of templateConfig.fileOperations) {
      const options: FileOptions | undefined = mod.options;
      if (mod.type === 'replace') {
        if (!mod.replacer || !mod.search) {
          throw new Error(`Invalid replace instruction for template: ${this.templateKey}`);
        }

        var replacer: string | ((match: string, content: string) => string) = mod.replacer ?? ((match) => match);

        if (replacer === '$project_name') replacer = this.projectName;
        else if (replacer === '$project_path') replacer = this.appDir;
        else if (replacer === '$template_key') replacer = this.templateKey;

        await this.editor.replaceContent(
          {
            files: mod.files,
            search: mod.search,
            replacer,
          },
          options
        );
      }
    }

    // Step 3: install dependencies
    await execa('npm', ['i'], { stdio: 'inherit', cwd: this.appDir });

    console.log(`✅ all packages installed successfully.`);
  }
}
