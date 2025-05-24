import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ClientService } from '../clients/client.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsClientExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly clientService: ClientService) {}

  async validate(
    clientId: string,
    // args: ValidationArguments,
  ): Promise<boolean> {
    const client = await this.clientService.findOne(clientId);
    return !!client; // Return true if the client exists, false otherwise
  }

  defaultMessage(args: ValidationArguments): string {
    return `Client with ID "${args.value}" does not exist.`;
  }
}

export function IsClientExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClientExistsConstraint,
    });
  };
}
