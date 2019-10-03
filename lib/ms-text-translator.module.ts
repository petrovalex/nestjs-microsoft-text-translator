import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createMsTextTranslatorClient } from './ms-text-translator-client.provider';
import { MSTEXTTRANSLATOR_MODULE_OPTIONS } from './ms-text-translator.constants';
import { MsTextTranslatorService } from './ms-text-translator.service';
import { MsTranslatorModuleOptions, MsTranslatorModuleAsyncOptions, MsTranslatorOptionsFactory } from './interfaces';

@Module({
  providers: [MsTextTranslatorService],
  exports: [MsTextTranslatorService],
})
export class MsTextTranslatorModule {
  static register(options: MsTranslatorModuleOptions): DynamicModule {
    return {
      module: MsTextTranslatorModule,
      providers: [createMsTextTranslatorClient(), { provide: MSTEXTTRANSLATOR_MODULE_OPTIONS, useValue: options }],
    };
  }

  static registerAsync(options: MsTranslatorModuleAsyncOptions): DynamicModule {
    return {
      module: MsTextTranslatorModule,
      imports: options.imports || [],
      providers: [createMsTextTranslatorClient(), ...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: MsTranslatorModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: MsTranslatorModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MSTEXTTRANSLATOR_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MSTEXTTRANSLATOR_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MsTranslatorOptionsFactory) =>
        await optionsFactory.createMsTranslatorOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
