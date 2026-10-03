import { addMemory } from '../../storage/json-storage.js';

export function addCommand(text) {
  try {
    const memory = addMemory(text);
    console.log(`✓ Memory #${memory.id} added`);
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exitCode = 1;
  }
}