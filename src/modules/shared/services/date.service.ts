import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { TimeUnits } from '../enums/time-units.enum';
import { ConfigService } from '@nestjs/config';
import { HttpServerConfiguration } from '@app/common';

export enum DateFormat {
  YYYYMMDD = 'yyyy-MM-dd',
}

@Injectable()
export class DateService {
  private tz: string;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<HttpServerConfiguration>('server');
    this.tz = config.tz;
  }

  public create(date?: Date): Date {
    const instance = (
      date ? DateTime.fromJSDate(date) : DateTime.now()
    ).setZone(this.tz);

    return instance.toJSDate();
  }

  public getFutureDatesFrom(
    date: Date,
    amount: number,
    unit: TimeUnits,
  ): Date[] {
    const datetime = DateTime.fromJSDate(date).setZone(this.tz);

    const dates = Array.from(Array(amount).keys()).map((times) =>
      datetime
        .plus({ [unit]: times + 1 })
        .setZone(this.tz)
        .toJSDate(),
    );

    return dates;
  }
}
