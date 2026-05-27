import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPassword', async: false })
export class IsValidPassword implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return false;
    if (text.length < 8) return false;
    if (text.includes(' ')) return false;
    const digitMatches = text.match(/\d/g);
    if (!digitMatches || digitMatches.length < 2) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be at least 8 characters, contain no spaces, and have at least 2 numeric digits.';
  }
}
