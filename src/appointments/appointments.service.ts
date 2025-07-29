import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>
  ) { }
  async create(createAppointmentDto: CreateAppointmentDto): Promise<string> {
    try {
      const doctor = await this.doctorRepository.findOne({ where: { code: createAppointmentDto.doctor_code } });
      if (!doctor) {
        throw new NotFoundException(`Doctor code ${createAppointmentDto.doctor_code} not found`);
      }

      if (!doctor.status) {
        throw new BadRequestException(`Doctor code ${createAppointmentDto.doctor_code} is not active`);
      }

      const appointmentData = this.appointmentRepository.create({
        ...createAppointmentDto,
        doctor,
      });
      const result = await this.appointmentRepository.save(appointmentData);

      if (result.id) {
        //TODO: Publicar evento...
      }
      return result.id;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Appointment[]> {
    try {
      const appointments = await this.appointmentRepository.find();
      return appointments;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
