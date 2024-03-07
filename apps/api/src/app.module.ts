import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DbModule, RmqModule } from '@app/shared';
import * as serviceNames from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/api/.env',
    }),
    DbModule,
    RmqModule.registerRmq(serviceNames.AUTH_SERVICE),
    RmqModule.registerRmq(serviceNames.BILLING_SERVICE),
    RmqModule.registerRmq(serviceNames.ORDER_SERVICE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
