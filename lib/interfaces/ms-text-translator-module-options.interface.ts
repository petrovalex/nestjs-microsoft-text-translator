import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ConfigOptions } from 'microsoft-text-translator';

export interface MsTranslatorModuleOptions extends ConfigOptions {}

export interface MsTranslatorOptionsFactory {
  createMsTranslatorOptions(): Promise<MsTranslatorModuleOptions> | MsTranslatorModuleOptions;
}

export interface MsTranslatorModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MsTranslatorOptionsFactory>;
  useClass?: Type<MsTranslatorOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MsTranslatorModuleOptions> | MsTranslatorModuleOptions;
  inject?: any[];
}
