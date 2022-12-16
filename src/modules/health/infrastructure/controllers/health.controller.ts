import { Controller, Get, HttpStatus, VERSION_NEUTRAL } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { HealthService } from '../../application/services/health.service';

@ApiTags('Health')
@Controller({
  version: VERSION_NEUTRAL,
  path: '/health',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is up',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Get('/')
  public health(): void {
    return this.healthService.health();
  }
}
