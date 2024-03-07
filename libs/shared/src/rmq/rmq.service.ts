import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false) {
    const user = this.configService.get('RABBITMQ_DEFAULT_USER');
    const pass = this.configService.get('RABBITMQ_DEFAULT_PASS');
    const host = this.configService.get('RABBITMQ_HOST_DEV');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${pass}@${host}`],
        queueOptions: {
          durable: true,
        },
        queue: this.configService.get(`RABBITMQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  ack(ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMessage = ctx.getMessage();
    channel.ack(originalMessage);
  }
}
