import type { TemplateConfig } from './../core/types';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const templates: TemplateConfig[] = [
  {
    name: 'Vite + React + TS',
    description: 'A standard React application using Vite and TypeScript.',
    key: 'vite-react',
    templatePath: path.resolve(__dirname, '../templates/reactViteApp'),
    fileOperations: [
      {
        type: 'replace',
        files: ['index.html', 'package.json'],
        replacer: '$project_name',
        search: '$project_name',
      },
    ],
    supportedFeatures: ['eruda', 'tailwindcss', 'material-you', 'redux-persist'],
    installedFeatures: ['material-you'],
  },
];

export const Templates = ['vite-react'] as const;
export type TemplateKey = (typeof Templates)[number];
