import { Expose } from "class-transformer";

export class EmployeeDTO{
    @Expose()
    name:string

    @Expose()
    email:string
}