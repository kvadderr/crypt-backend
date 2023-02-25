import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from './order/order.module'
import { CryptModule } from './crypt/crypt.module'

import { Order } from './order/order.model' 
import { Crypt } from './crypt/crypt.model' 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      synchronize: true,
      migrationsRun: true, 
      entities: [
        Order,
        Crypt
      ],
      subscribers: ['dist/subscriber/*.js'],
      migrations: ['dist/migration/*.js'],
    }),

    OrderModule,
    CryptModule
  ],
  providers: [AppModule],
})
export class AppModule {}
