import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsValidEmailDomain implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
