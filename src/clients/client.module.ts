import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { IsClientExistsConstraint } from 'src/custom-decorators/is-client-exists.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  // Provide custom decorator to validate Client
  providers: [ClientService, IsClientExistsConstraint],
  exports: [ClientService, IsClientExistsConstraint],
})
export class ClientModule {}
