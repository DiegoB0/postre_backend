import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({ status: 201, description: 'Restaurant created successfully.' })
  create(@Body() data: Partial<Restaurant>) {
    return this.restaurantService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({ status: 200, description: 'List of restaurants.' })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant details.' })
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant updated successfully.' })
  update(@Param('id') id: string, @Body() data: Partial<Restaurant>) {
    return this.restaurantService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
