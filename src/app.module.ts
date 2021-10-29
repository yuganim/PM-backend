import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { LogModule } from './log/log.module';
import { FreeLog } from './log/entities/free-log.entity';
import { CharacterModule } from './character/character.module';
import { RelationModule } from './relation/relation.module';
import { ItemModule } from './item/item.module';
import { Relation } from './relation/entities/relation.entity';
import { Comment } from './log/entities/comment.entity';
import { Inventory } from './item/entities/inventory.entity';
import { Item } from './item/entities/item.entity';
import { Character } from './character/entities/character.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [User, FreeLog, Relation, Comment, Inventory, Item, Character],
    }),
    UserModule,
    JwtModule,
    LogModule,
    CharacterModule,
    RelationModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JwtMiddleware).forRoutes('/');
  }
}
