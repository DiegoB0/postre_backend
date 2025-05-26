import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
// import { IsClientExists } from 'src/custom-decorators/is-client-exists.decorator';

export class CreateRestaurantDto {
  @ApiProperty({
    example: 'My Awesome Restaurant',
    description: 'The name of the restaurant',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A cozy place for family dining',
    description: 'A brief description of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Italian',
    description: 'The type of cuisine or restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: '9:00 AM - 10:00 PM',
    description: 'The operative hours of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  operative_hours?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the restaurant is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Address Fields
  @ApiProperty({
    example: 'New York',
    description: 'The city where the restaurant is located',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'NY',
    description: 'The state where the restaurant is located',
    required: false,
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'The street address of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    example: '45',
    description: 'The building number of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({
    example: '10001',
    description: 'The ZIP code of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  zipcode?: string;

  @ApiProperty({
    example: 'EST',
    description: 'The timezone of the restaurant',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone?: string;

  // Branding Fields
  @ApiProperty({
    example: '#FF5733',
    description: 'The primary color for the restaurant branding',
    required: false,
  })
  @IsString()
  @IsOptional()
  primary_color?: string;

  @ApiProperty({
    example: '#C70039',
    description: 'The secondary color for the restaurant branding',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondary_color?: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'The URL of the restaurant logo',
    required: false,
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: 'client-id-123',
    description: 'The ID of the client who owns the restaurant',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  clientId: string; // This will map to the `client` foreign key
}
