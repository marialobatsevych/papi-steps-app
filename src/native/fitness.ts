import { registerPlugin } from '@capacitor/core';

const FitnessPlugin: any = registerPlugin('FitnessPlugin');

export async function requestAuthorization(): Promise<{ granted: boolean }> {
  return await FitnessPlugin.requestAuthorization();
}

export async function readSteps(start?: number, end?: number): Promise<{ steps: number }> {
  return await FitnessPlugin.readSteps({ start: start || 0, end: end || Date.now() });
}
