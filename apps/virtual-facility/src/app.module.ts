import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './buildings/entities/building.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Building],
      synchronize: true,
    }), 
    BuildingsModule, HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
