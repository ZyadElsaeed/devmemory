import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
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

function readData(cwd) {
  const { file } = getPaths(cwd);

  if (!existsSync(file)) {
    throw new Error('DevMemory is not initialized. Run "devmemory init" first.');
  }

  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    throw new Error(`Could not read ${file}: the file is not valid JSON.`);
  }
}

function writeData(data, cwd) {
  const { file } = getPaths(cwd);
  const tmp = `${file}.tmp`;

  writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n');
  renameSync(tmp, file);
}

export function addMemory(text, cwd = process.cwd()) {
  const clean = String(text ?? '').trim();
  if (!clean) {
    throw new Error('Memory text cannot be empty.');
  }

  const data = readData(cwd);
  const nextId = data.memories.reduce((max, m) => Math.max(max, m.id), 0) + 1;

  const memory = {
    id: nextId,
    text: clean,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  data.memories.push(memory);
  writeData(data, cwd);
  return memory;
}