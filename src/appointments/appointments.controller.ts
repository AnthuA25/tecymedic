import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
     const result = await this.appointmentsService.create(createAppointmentDto);
    
    return {
      success: true,
      message: 'Appointment created successfully',
      appointment_id: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.appointmentsService.findAll();
    return {
      success: true,
      appointments: result,
    };
  }
}
