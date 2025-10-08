import { Module } from '@nestjs/common';
import { WorkflowsModule } from './workflows/workflows.module';
import { Workflow } from './workflows/entities/workflow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5433'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Workflow],
      synchronize: true,
    }),
    WorkflowsModule
  ],
  controllers: [],
  providers: [],
})
export class WorkflowServiceModule {}
