import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  public health() {
    Logger.log('HealthCheck', HealthService.name);
  }
}
