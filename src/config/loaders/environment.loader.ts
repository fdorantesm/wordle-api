import { registerAs } from '@nestjs/config';
import { HttpServerConfiguration } from '@app/common';
import { EnvironmentConfig } from '@app/common/types/environment/environment.type';

export const environmentConfigLoader = registerAs(
  'environment',
  (): EnvironmentConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
  }),
);
