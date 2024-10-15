import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    // try {
      Logger.debug('Called every 10 seconds');
      this.appService.getHero();
    // } catch (error) {
    //   Logger.error(error);
    // }
  }

  @GrpcMethod('Heroes2Service', 'FindOne2')
  findOne2(
    data: HeroById,
  ): Hero {
    Logger.debug('FIND ONE 2');
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
