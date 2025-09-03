// src/native/NativeAddModule.ts
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  invoke(method: string, args: string): Promise<{ raw: string; parsed: unknown }>;
  methods(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AddModule');