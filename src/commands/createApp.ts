import inquirer from 'inquirer';
import fs from 'fs-extra';
import { App } from './../core/App';
import { Feature } from './../core/Feature';
import { Template } from './../core/Template';
import { FileEditor } from './../core/FileEditor';
import type { TemplateKey, FeatureKey } from './../core/types';
import { Features } from './../config/features';
import { Templates } from './../config/templates';

export async function createApp(defaultName?: string) {
  try {
    // Step 1: Ask for app name
    const { name } = await inquirer.prompt<{ name: string }>([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your app name:',
        default: defaultName ?? 'my-app',
      },
    ]);

    // Step 2: Select a template
    const { template } = await inquirer.prompt<{ template: TemplateKey }>([
      {
        name: 'template',
        message: 'Choose a template:',
        type: 'list',
        choices: Templates,
      },
    ]);

    // Step 3: Create app instance
    const app = new App(name, `A project named ${name}`);
    const fileEditor = new FileEditor(app.getAppDir());
    app.setEditor(fileEditor);
    const templateInstance = new Template(template);
    app.setTemplate(templateInstance);
    await app.create();

    // Step 4: Ask whether want features or not
    const { wantFeatures } = await inquirer.prompt<{ wantFeatures: boolean }>([
      {
        name: 'wantFeatures',
        type: 'confirm',
        message: 'Do you want to install extra features?',
        default: false,
      },
    ]);
    if (!wantFeatures) {
      // Step 5: Save installed features to rappm.json
      const rappmFilePath = app.resolvePath('rappm.json');
      const rappm = {
        name,
        description: `A project named ${name}`,
        template,
        projectPath: app.getProjectPath(),
      };

      await fs.writeJson(rappmFilePath, rappm, { spaces: 2 });
      return;
    }

    // Step 6: Choose features
    const { features } = await inquirer.prompt<{ features: FeatureKey[] }>([
      {
        name: 'features',
        message: 'Select features to include:',
        type: 'checkbox',
        choices: Features,
      },
    ]);

    // Step 7: Add selected features
    for (const key of features) {
      const feature = new Feature(key);
      await app.addFeature(feature);
    }

    // Step 8: Save installed features to rappm.json
    const rappmFilePath = app.resolvePath('rappm.json');
    const rappm = {
      name,
      description: `A project named ${name}`,
      template,
      installedFeatures: features,
      projectPath: app.getProjectPath(),
    };

    await fs.writeJson(rappmFilePath, rappm, { spaces: 2 });
  } catch (error) {
    console.error('❌ Failed to create app:', error);
  }
}
