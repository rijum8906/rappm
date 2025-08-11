import { type Template } from './Template';
import { type FileEditor } from './FileEditor';
import { type Feature } from './Feature';
import path from 'path';

export class App {
  private name: string;
  private description: string;
  private appDir: string;
  private template!: Template;
  private editor: FileEditor;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.appDir = path.join(process.cwd(), name);
  }

  setTemplate(template: Template): void {
    this.template = template;
  }

  setEditor(editor: FileEditor): void {
    this.editor = editor;
  }

  async create(): Promise<void> {
    if (!this.template) {
      throw new Error('Template is not set');
    }

    await this.template.generate(this.name, this.appDir);
    console.log(`✅ Project "${this.name}" created successfully!`);
  }

  async addFeature(feature: Feature): Promise<void> {
    feature.setEditor(this.editor);
    await feature.install(this.appDir);
    console.log(`✅ "${feature.getKey()}" feature successfully added`);
  }

  getProjectPath(): string {
    return this.appDir;
  }

  resolvePath(file: string) {
    return path.resolve(this.appDir, file);
  }
}
