import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Hero, HeroById } from './app.controller';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroesService {
  findOne(data: HeroById): Hero;
}

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  getHero(): void {
    Logger.debug('IN GET HERO');
    Logger.debug(Object.values(this.heroesService.findOne({ id: 1 })));
  }
}
