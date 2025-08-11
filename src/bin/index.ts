#!/usr/bin/env node

import { Command } from 'commander';
import { createApp } from './../commands/createApp';
import { addFeatures } from './../commands/addFeatures';

const program = new Command();

program.name('rappm').description('Rappm CLI - Scaffold your app fast').version('1.0.0');

program
  .command('create <project-name>')
  .description('Create a new app')
  .action((name) => {
    createApp(name);
  });

program
  .command('add features')
  .description('Add a new feature to app')
  .action(() => {
    addFeatures();
  });

program.parse();
