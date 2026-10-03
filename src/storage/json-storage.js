import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR_NAME = '.devmemory';
const FILE_NAME = 'memories.json';

export function getPaths(cwd = process.cwd()) {
  const dir = join(cwd, DIR_NAME);
  return { dir, file: join(dir, FILE_NAME) };
}

export function initStorage(cwd = process.cwd()) {
  const { dir, file } = getPaths(cwd);
  const initialData = { version: 1, memories: [] };

  mkdirSync(dir, { recursive: true });

  try {
    // flag 'wx' = اكتب فقط لو الملف مش موجود
    writeFileSync(file, JSON.stringify(initialData, null, 2) + '\n', {
      flag: 'wx',
    });
    return { created: true, file };
  } catch (err) {
    if (err.code === 'EEXIST') {
      return { created: false, file };
    }
    throw err;
  }
}