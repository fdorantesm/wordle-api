import { Injectable } from '@nestjs/common';
import { PartFile } from '@app/common/types/storage/part-file.type';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class S3Service {
  constructor(
    @InjectS3()
    private readonly s3: S3,
  ) {}

  public async headObject(bucket: string, key: string) {
    const file = await this.s3
      .headObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();

    return {
      contentLength: file.ContentLength,
      contentType: file.ContentType,
      contentEncoding: file.ContentEncoding,
    };
  }

  public getObjectStream(bucket: string, key: string, range?: string) {
    const file = this.s3
      .getObject({
        Bucket: bucket,
        Key: key,
        Range: range,
      })
      .createReadStream();

    return file;
  }

  public async upload(
    path: string,
    file: Buffer,
    bucket?: string,
  ): Promise<string> {
    const object = await this.s3
      .upload({ Key: path, Bucket: bucket, Body: file })
      .promise();
    return object.Location;
  }

  public async getSignedUrl(key: string, bucket: string): Promise<string> {
    const signedUrl = await this.s3.getSignedUrl('getObject', {
      Key: key,
      Bucket: bucket,
      Expires: 3600,
    });

    return signedUrl;
  }

  public async createMultiparUpload(
    uploadId: string,
    bucket: string,
    contentType?: string,
  ): Promise<string> {
    const { UploadId } = await this.s3
      .createMultipartUpload({
        Bucket: bucket,
        Key: uploadId,
        ContentType: contentType,
      })
      .promise();

    return UploadId;
  }

  public async uploadPart(
    bucket: string,
    key: string,
    file: Buffer,
    uploadId: string,
    partNumber: number,
  ): Promise<string> {
    const { ETag } = await this.s3
      .uploadPart({
        Bucket: bucket,
        Key: key,
        Body: file,
        UploadId: uploadId,
        PartNumber: partNumber,
      })
      .promise();

    return ETag;
  }

  public async completeMultipartUpload(
    bucket: string,
    key: string,
    uploadId: string,
    parts: PartFile[],
  ): Promise<string> {
    await this.s3
      .completeMultipartUpload({
        Bucket: bucket,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts.map((part) => ({
            ETag: part.eTag,
            PartNumber: part.partNumber,
          })),
        },
      })
      .promise();

    const signedUrl = await this.getSignedUrl(key, bucket);

    return signedUrl;
  }

  public async deleteObject(bucket: string, key: string): Promise<boolean> {
    const q = await this.s3
      .deleteObject({
        Key: key,
        Bucket: bucket,
      })
      .promise();

    return true;
  }
}
