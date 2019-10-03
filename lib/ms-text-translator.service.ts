import { Inject, Injectable } from '@nestjs/common';
import { MsTextTranslator } from 'microsoft-text-translator';
import { MSTEXTTRANSLATOR_CLIENT } from './ms-text-translator-client.provider';

@Injectable()
export class MsTextTranslatorService {
  constructor(@Inject(MSTEXTTRANSLATOR_CLIENT) private readonly client: MsTextTranslator) {}

  getClient(): MsTextTranslator {
    return this.client;
  }
}
