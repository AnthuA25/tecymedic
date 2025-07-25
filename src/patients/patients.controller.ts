import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPatientDto: CreatePatientDto) {
    const result = await this.patientsService.create(createPatientDto);
    return {
      success: true,
      message: 'Patient created successfully',
      patient_code: result,
    }
  }

  @Get()
  async findAll() {
    const result = await this.patientsService.findAll();

    return {
      success: true,
      patients: result,
    };
  }

  @Get(':code')
  async findCode(@Param('code') code: string) {
    const result = await this.patientsService.findCode(code);

    return {
      success: true,
      patient: result,
    };
  }
}
