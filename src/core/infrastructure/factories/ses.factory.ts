import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SESModuleOptions,
  SESModuleOptionsFactory,
} from '@pluzchat/nestjs-ses';

import { EmailConfig } from '@app/common/types/email/email.type';

@Injectable()
export class SesFactory implements SESModuleOptionsFactory {
  protected params: EmailConfig;
  protected config: SESModuleOptions;
  constructor(private readonly configService: ConfigService) {
    this.params = configService.get<EmailConfig>('email');
  }
  createSESModuleOptions(): SESModuleOptions | Promise<SESModuleOptions> {
    return {
      config: {
        region: this.params.region,
        credentials: {
          accessKeyId: this.params.credentials.publicKey,
          secretAccessKey: this.params.credentials.secretKey,
        },
      },
    };
  }
}
