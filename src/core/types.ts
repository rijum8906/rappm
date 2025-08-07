// Re-export keys for external use
import type { FeatureKey } from "./../config/features";
import { type TemplateKey } from "./../config/templates";

export type { FeatureKey, TemplateKey };

// Generic file options used for formatting, etc.
export interface FileOptions {
  format?: boolean;
}

// Create operation: generates a new file with content
export interface CreateFileOperation {
  type: "create";
  file: string;
  content: string;
  options?: FileOptions;
}

// Copy operation: copies a file from source to destination
export interface CopyFileOperation {
  type: "copy";
  file: string;
  source: string;
  options?: FileOptions;
}

// Inject operation: inserts content at a specified marker
export interface InjectFileOperation {
  type: "inject";
  file: string;
  content: string;
  marker: string | RegExp;
  options?: FileOptions;
}

// Replace operation: replaces existing content matched by a marker
export interface ReplaceFileOperation {
  type: "replace";
  file: string;
  replacer: string | ((match: string) => string);
  search?: string | RegExp;
  options?: FileOptions;
}

// Union of all supported file operations
export type FileOperation =
  | CreateFileOperation
  | CopyFileOperation
  | InjectFileOperation
  | ReplaceFileOperation;

// Configuration for a single installable feature
export interface FeatureConfig {
  key: FeatureKey;
  name: string;
  description: string;
  fileOperations: FileOperation[];
  dependencies: string[];
}

// Configuration for a project template
export interface TemplateConfig {
  key: TemplateKey;
  name: string;
  description: string;
  templatePath: string;
  fileOperations: FileOperation[];
  supportedFeatures: FeatureKey[];
}
