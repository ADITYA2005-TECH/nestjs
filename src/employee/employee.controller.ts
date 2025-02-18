import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmailParam } from 'src/common/decorator/email.decorator';
import { AuthenticationGuard } from 'src/common/guard/authentication.guard';
import { IntegerPipe } from 'src/common/pipe/integer.pipe';
import { EmployeeDTO } from './dto/employee.dto';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}
  @Get()
  // @Serialize(EmployeeDTO)
  getAllEmployee(): Promise<EmployeeDTO[]> {
    return this.employeeService.getAllEmployee();
  }

  @Get(':id')
  @UsePipes(IntegerPipe)
  getEmployeeById(@Param('id') id: number): Promise<EmployeeDTO> {
    return this.employeeService.getEmployeeById(id);
  }

  @Get('search/:email')
  getEmployeeByEmail(@EmailParam() email: string) {
    return this.employeeService.getEmployeeByEmail(email);
  }

  @Delete(':id')
  deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(parseInt(id));
  }

  @Post()
  // @Roles('admin', 'manager')
  // @UseGuards(AuthorizationGuard)
  createEmployee(
    @Body()
    // new ValidationPipe({
    //   disableErrorMessages: true,
    //   whitelist: true,
    //   forbidNonWhitelisted: true,
    // }),
    body: any,
  ) {       
    return this.employeeService.createEmployee(body);
  }

  @Patch(':id')
  updateEmployeeById(@Param('id') id: string, @Body() body: any) {
    return this.employeeService.updateEmployeeById(parseInt(id), body);
  }
}
