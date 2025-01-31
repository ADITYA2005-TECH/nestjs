import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeDTO } from './dto/employee.dto';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getAllEmployee(): Promise<EmployeeDTO[]> {
    return await this.employeeRepository.find({
      where: { statusDelete: false },
    });
    // return plainToInstance(EmployeeDTO, employees, { excludeExtraneousValues: true });
  }

  async getEmployeeById(id: number) {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async createEmployee(body: any) {
    const emp = this.employeeRepository.create(body);
    return this.employeeRepository.save(emp);
  }

  async getEmployeeByEmail(email: string) {
    const result = await this.employeeRepository.findOne({ where: { email } });
    if (result) return { data: result, message: 'Sucessfully Searched' };
    else return { data: result, message: 'Email Not Found' };
  }

  async deleteEmployeeById(id: number) {
    const emp = await this.getEmployeeById(id);
    emp.statusDelete = true;
    return this.employeeRepository.update(id, emp);
  }

  async updateEmployeeById(id: number, body: any) {
    const emp = await this.getEmployeeById(id);
    const { name, email } = body;
    emp.name = name;
    emp.email = email;

    const result = await this.employeeRepository.update(id, emp);
    if (result.affected == 1) return { message: 'Successfully Updated' };
    else return { message: 'Unable to Update' };
  }
}
