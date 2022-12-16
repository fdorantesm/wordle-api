import { File } from '@app/common/types/general/file.type';
import { Injectable } from '@nestjs/common';

import { SlugService } from 'src/modules/shared/services/slug.service';

import { ShortIdService } from './short-id.service';

@Injectable()
export class FileService {
  constructor(
    private readonly slugService: SlugService,
    private readonly shortId: ShortIdService,
  ) {}

  public makeSlug(file: File): string {
    const filenameBase = file.originalname.replace(/\./g, '-');
    const extension = file.originalname.split('.').pop();
    const originalname = filenameBase.trim().replace(extension, '');
    const fileSlug = this.slugService.exec(originalname);
    const shortId = this.shortId.exec();
    const filename = `${fileSlug}-${shortId}.${extension}`;
    return filename;
  }
}
