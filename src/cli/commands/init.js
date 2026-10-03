import { initStorage } from '../../storage/json-storage.js';

export function initCommand() {
  try {
    const { created } = initStorage();

    if (created) {
      console.log('✓ DevMemory initialized');
      console.log('✓ Project memory created');
    } else {
      console.log('⚠ DevMemory is already initialized in this project');
    }
  } catch (err) {
    console.error(`✗ Failed to initialize DevMemory: ${err.message}`);
    process.exitCode = 1;
  }
}