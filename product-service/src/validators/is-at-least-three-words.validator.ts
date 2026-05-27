import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isAtLeastThreeWords', async: false })
export class IsAtLeastThreeWords implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return false;
    const words = text.trim().split(/\s+/);
    return words.length >= 3;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Name must contain at least 3 words.';
  }
}
