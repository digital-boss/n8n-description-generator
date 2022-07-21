import { ExecException } from 'child_process';

export * from './newNode';
export * from './newPackage';

/**
 * Use it to output result to console with exec (from 'child_process') function.
 */
export const execLog = (err: ExecException | null, stdout: string, stderr: string) => {
  console.log(err);
  console.log(stdout);
  console.log(stderr);
}