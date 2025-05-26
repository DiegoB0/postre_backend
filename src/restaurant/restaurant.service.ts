import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { ClientService } from 'src/clients/client.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    private readonly clientService: ClientService,
  ) {}

  async create(data: CreateRestaurantDto) {
    const { clientId, ...restaurantData } = data;
    const client = await this.clientService.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }
    const restaurant = this.restaurantRepo.create({
      ...restaurantData,
      client,
    });
    return this.restaurantRepo.save(restaurant);
  }

  findAll() {
    return this.restaurantRepo.find({ relations: ['client'] });
  }

  findOne(id: string) {
    return this.restaurantRepo.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  update(id: string, data: Partial<Restaurant>) {
    return this.restaurantRepo.update(id, data);
  }

  remove(id: string) {
    return this.restaurantRepo.delete(id);
  }
}
