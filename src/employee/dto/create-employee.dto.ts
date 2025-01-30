import { IsString } from "class-validator";

export class CreateEmployeeDTO{
    @IsString()
    name:string

    @IsString()
    email:string
}