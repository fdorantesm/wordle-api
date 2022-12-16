import { S3ModuleOptionsFactory } from 'nestjs-s3/dist/s3.interfaces.d';
import { S3ModuleOptions } from 'nestjs-s3/dist/s3.interfaces.d';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageConfiguration } from '@app/common/types/storage/storage.type';

@Injectable()
export class S3Factory implements S3ModuleOptionsFactory {
  protected params: StorageConfiguration;
  protected config: S3ModuleOptions;
  constructor(private readonly configService: ConfigService) {
    this.params = configService.get<StorageConfiguration>('storage');
  }
  createS3ModuleOptions(): S3ModuleOptions | Promise<S3ModuleOptions> {
    return {
      config: {
        credentials: {
          accessKeyId: this.params.publicKey,
          secretAccessKey: this.params.privateKey,
        },
      },
    };
  }
}
