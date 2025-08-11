import { execa } from 'execa';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

interface InstallOptions {
  dev?: boolean;
  manager?: PackageManager;
  cwd?: string;
}

export async function installDeps(packages: string[], options: InstallOptions = {}): Promise<void> {
  if (packages.length !== 0) {
    const { dev = false, manager = 'npm', cwd } = options;

    let command = manager;
    let args: string[] = [];

    switch (manager) {
      case 'npm':
        args = ['install', ...packages];
        if (dev) args.push('--save-dev');
        break;

      case 'yarn':
        args = ['add', ...packages];
        if (dev) args.push('--dev');
        break;

      case 'pnpm':
        args = ['add', ...packages];
        if (dev) args.push('--save-dev');
        break;

      case 'bun':
        args = ['add', ...packages];
        if (dev) args.push('--dev');
        break;

      default:
        throw new Error(`Unsupported package manager: ${manager}`);
    }

    try {
      console.log(`📦 Installing ${packages.join(', ')} using ${manager}...`);
      await execa(command, args, { stdio: 'inherit', cwd });
    } catch (error) {
      console.error('❌ Failed to install packages:', error);
    }
  }
}
