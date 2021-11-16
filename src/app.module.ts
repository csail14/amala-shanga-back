import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';

if (!process.env.HOST_DB) {
  var config = require('../config');
} else {
  var config = require('../config-exemple');
}

import { UsersModule } from './users/users.module';

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: host,
      port: port,
      username: user,
      password: password,
      database: database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
