import { MsTextTranslator } from 'microsoft-text-translator';
import { MSTEXTTRANSLATOR_MODULE_OPTIONS } from './ms-text-translator.constants';
import { MsTranslatorModuleOptions } from './interfaces';

export const MSTEXTTRANSLATOR_CLIENT = 'MSTEXTTRANSLATOR_CLIENT';

export const createMsTextTranslatorClient = () => ({
  provide: MSTEXTTRANSLATOR_CLIENT,
  useFactory: (options: MsTranslatorModuleOptions) => {
    return new MsTextTranslator(options);
  },
  inject: [MSTEXTTRANSLATOR_MODULE_OPTIONS],
});
