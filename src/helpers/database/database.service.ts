import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions():
    | (TypeOrmModuleOptions & { factories: any; seeds: any; cli: any })
    | (Promise<TypeOrmModuleOptions> & { factories: any; seeds: any }) {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      synchronize: this.configService.get('DB_SYNC') === 'true',
      entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
      factories: ['dist/**/factories/**/*.js'],
      seeds: ['dist/**/seeds/**/*.js'],
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'dist/migration',
      },
      autoLoadEntities: true,
    };
  }
}

export const typeOrmConfig: TypeOrmModuleOptions & {
  factories: any;
  seeds: any;
  cli: any;
} = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
  factories: ['dist/**/factories/**/*.js'],
  seeds: ['dist/**/seeds/**/*.js'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: process.env.DB_SYNC === 'true',
  migrations: ['src/migrations/**'],
  autoLoadEntities: true,
  cli: {
    migrationsDir: 'dist/migration',
  },
};
