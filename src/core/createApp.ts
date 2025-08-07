import inquirer from "inquirer";
import { App } from "./App";
import { Feature } from "./Feature";
import { Template } from "./Template";
import { FileEditor } from "./FileEditor";
import type { TemplateKey, FeatureKey } from "./types";
import { Features } from "./../config/features";
import { Templates } from "./../config/templates";

export async function createApp(defaultName?: string) {
  try {
    // Step 1: Ask for app name
    const { name } = await inquirer.prompt<{ name: string }>([
      {
        type: "input",
        name: "name",
        message: "Enter your app name:",
        default: defaultName ?? "my-app",
      },
    ]);

    // Step 2: Select a template
    const { template } = await inquirer.prompt<{ template: TemplateKey }>([
      {
        name: "template",
        message: "Choose a template:",
        type: "list",
        choices: Templates,
      },
    ]);

    // Step 3: Choose features
    const { features } = await inquirer.prompt<{ features: FeatureKey[] }>([
      {
        name: "features",
        message: "Select features to include:",
        type: "checkbox",
        choices: Features,
      },
    ]);

    // Step 4: Create app instance
    const app = new App(name, `A project named ${name}`);
    const fileEditor = new FileEditor(app.getProjectPath());

    // Step 5: Set the selected template
    const templateInstance = new Template(template);
    templateInstance.setEditor(fileEditor);
    app.setTemplate(templateInstance);

    // Step 6: Create base project
    await app.create();

    // Step 7: Add selected features
    for (const key of features) {
      const feature = new Feature(key);
      feature.setEditor(fileEditor);
      await app.addFeature(feature);
    }

    console.log(`✅ Project "${name}" created successfully!`);
  } catch (error) {
    console.error("❌ Failed to create app:", error);
  }
}
