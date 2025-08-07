#!/usr/bin/env node

import { Command } from "commander";
import { createApp } from "./../core/createApp";

const program = new Command();

program
  .name("rappm")
  .description("Rappm CLI - Scaffold your app fast")
  .version("1.0.0");

program
  .command("create <project-name>")
  .description("Create a new app")
  .action((name) => {
    createApp(name);
  });

program.parse();
