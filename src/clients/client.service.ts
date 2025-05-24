import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  create(data: Partial<Client>) {
    const client = this.clientRepo.create(data);
    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find({ relations: ['restaurants'] });
  }

  findOne(id: string) {
    return this.clientRepo.findOne({
      where: { id },
      relations: ['restaurants'],
    });
  }

  update(id: string, data: Partial<Client>) {
    return this.clientRepo.update(id, data);
  }

  remove(id: string) {
    return this.clientRepo.delete(id);
  }
}
