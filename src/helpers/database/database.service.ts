import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions():
    | (TypeOrmModuleOptions & { factories: any; seeds: any })
    | (Promise<TypeOrmModuleOptions> & { factories: any; seeds: any }) {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      synchronize: this.configService.get('DB_PASSWORD') === 'true',
      entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
      factories: ['dist/**/factories/**/*.js'],
      seeds: ['dist/**/seeds/**/*.js'],
    };
  }
}
