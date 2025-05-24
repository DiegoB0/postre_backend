import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  create(data: Partial<Restaurant>) {
    const restaurant = this.restaurantRepo.create(data);
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
