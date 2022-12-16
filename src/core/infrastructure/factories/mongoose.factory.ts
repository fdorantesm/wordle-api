import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConnectionString } from 'connection-string';
import * as mongoosePaginate from 'mongoose-paginate';
import { mongooseHideObjectId } from '@plugins/mongoose-hide-object-id';
import { DatabaseConnection } from '@app/common';

mongoose.set('debug', !true);

@Injectable()
export class MongooseFactory implements MongooseOptionsFactory {
  protected config: MongooseModuleOptions;

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get<DatabaseConnection>('database');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    const uri = new ConnectionString('', {
      user: this.config.username,
      password: this.config.password,
      protocol: this.config.port ? 'mongodb' : 'mongodb+srv',
      hosts: [{ name: this.config.host, port: this.config.port }],
    }).toString();

    return {
      uri,
      dbName: this.config.database,
      useNewUrlParser: true,
      connectionFactory: async (
        connection: mongoose.Connection,
      ): Promise<mongoose.Connection> => {
        connection.plugin(mongooseHideObjectId);
        connection.plugin(mongoosePaginate);
        return connection;
      },
    };
  }
}
