import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

@Module({
  controllers: [],
  imports: [],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static exchangeRmq(name: string, type = 'direct'): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        RabbitMQModule.forRoot({
          exchanges: [
            { name, type },
            // Define other exchanges as needed
          ],
          uri: process.env.RABBITMQ_URI,
        }),
      ],
      exports: [RabbitMQModule],
    };
  }

  static registerRmq(name: string): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => {
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [configService.get<string>('RABBITMQ_URI')],
                  queue: configService.get(`RABBITMQ_${name}_QUEUE`),
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
