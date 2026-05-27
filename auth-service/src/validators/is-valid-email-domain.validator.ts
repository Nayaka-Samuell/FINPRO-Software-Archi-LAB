import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidEmailDomain', async: false })
export class IsValidEmailDomain implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return false;
    return text.endsWith('.com') || text.endsWith('.net') || text.endsWith('.org') || text.endsWith('.id');
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email must end with .com, .net, .org, or .id';
  }
}
