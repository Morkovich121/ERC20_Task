import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransferModule } from './transfers/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gpl',
      sortSchema: true,
      playground: true,
      driver: ApolloDriver,
    }),
    TransferModule,
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get<string>('TYPEORM_HOST'),
    //     username: config.get<string>('TYPEORM_USERNAME'),
    //     password: config.get<string>('TYPEORM_PASSWORD'),
    //     database: config.get<string>('TYPEORM_DATABASE'),
    //     port: config.get<number>('TYPEORM_PORT'),
    //     entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     autoLoadEntities: true,
    //     logging: true,
    //   }),
    // }),
  ],
})
export class AppModule {}
