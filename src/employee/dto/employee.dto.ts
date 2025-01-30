import { IsString, isString } from "class-validator";

export class EmployeeDTO{
    @IsString()
    name:string

    @IsString()
    email:string
}