import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { App } from './../core/App';
import { Feature } from './../core/Feature';
import { FileEditor } from './../core/FileEditor';
import type { FeatureKey } from './../core/types';
import { Features } from './../config/features';

export async function addFeatures() {
  try {
    const projectDir = process.cwd();
    const rappmFilePath = path.join(projectDir, 'rappm.json');
    if (!(await fs.pathExists(rappmFilePath))) {
      console.error('❌ This does not appear to be a valid rappm app.');
      return;
    }

    const { features } = await inquirer.prompt<{ features: FeatureKey[] }>([
      {
        name: 'features',
        message: 'Select features to include:',
        type: 'checkbox',
        choices: Features,
      },
    ]);

    if (features.length !== 0) {
      const rappmFileContent = await fs.readFile(rappmFilePath, 'utf-8');
      const rappm = JSON.parse(rappmFileContent);

      const fileEditor = new FileEditor(rappm.projectPath || projectDir);

      for (const f of features) {
        const feature = new Feature(f);
        feature.setEditor(fileEditor);

        await feature.install(rappm.projectPath || projectDir);

        // Optionally update rappm.json to include installed features
        rappm.installedFeatures ??= [];
        if (!rappm.installedFeatures.includes(f)) {
          rappm.installedFeatures.push(f);
        }
      }

      await fs.writeJson(rappmFilePath, rappm, { spaces: 2 });
      console.log('✅ Features added successfully.');
    }
  } catch (error) {
    console.error('❌ Failed to add feature(s):', error);
  }
}
