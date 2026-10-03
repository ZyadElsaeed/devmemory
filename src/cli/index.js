#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { Command } from 'commander';

const pkg = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
);

const program = new Command();

program
  .name('devmemory')
  .description('Project memory for developers.')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize DevMemory in the current project')
  .action(() => console.log('init: not implemented yet'));

program
  .command('add')
  .description('Add a new memory')
  .action(() => console.log('add: not implemented yet'));

program
  .command('list')
  .description('List all memories')
  .action(() => console.log('list: not implemented yet'));

program
  .command('search')
  .description('Search memories')
  .action(() => console.log('search: not implemented yet'));

program.parse();