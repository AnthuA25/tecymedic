import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const result = await this.doctorsService.create(createDoctorDto);

    return {
      success: true,
      message: 'Doctor created successfully',
      doctor_code: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.doctorsService.findAll();

    return {
      success: true,
      doctors: result,
    };
  }

  @Get(':code')
  async findCode(@Param('code') code: string) {
    const result = await this.doctorsService.findCode(code);

    return {
      success: true,
      doctor: result,
    };
  }
}
