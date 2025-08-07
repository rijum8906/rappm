import { type Template } from "./Template";
import { type Feature } from "./Feature";
import path from "path";

export class App {
  private name: string;
  private description: string;
  private projectPath: string;
  private template!: Template;
  private features: Feature[] = [];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.projectPath = path.join(process.cwd(), name);
  }

  setTemplate(template: Template): void {
    this.template = template;
  }

  async create(): Promise<void> {
    if (!this.template) {
      throw new Error("Template is not set");
    }

    await this.template.generate(this.name, this.projectPath);
  }

  async addFeature(feature: Feature): Promise<void> {
    this.features.push(feature);
    await feature.install(this.projectPath);
  }

  getProjectPath(): string {
    return this.projectPath;
  }
}
