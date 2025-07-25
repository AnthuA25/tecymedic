//TODO: Refactorizar el select.
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {

  private readonly logger = new Logger(DoctorsService.name);

  constructor(@InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>) { }
  async create(createDoctorDto: CreateDoctorDto): Promise<string> {
    try {
      const doctor = this.doctorRepository.create({
        ...createDoctorDto,
        code: `DR${Date.now()}`.slice(0, 10),
      });
      const result = await this.doctorRepository.save(doctor);

      return result.code;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Doctor[]> {
    try {
      const doctors = await this.doctorRepository.find({
        select: ['name', 'last_name', 'speciality', 'license', 'email', 'code', 'created_at', 'updated_at', 'status'], //TODO: Buscar solución para que no nuestra el ID desde la entidad.
      });
      return doctors;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  async findCode(code: string) {
    try {
      const doctor = await this.doctorRepository.findOne({
        where: { code },
        select: ['name', 'last_name', 'speciality', 'license', 'email', 'code', 'created_at', 'updated_at', 'status'], //TODO: Buscar solución para que no nuestra el ID desde la entidad.
      });

      if (!doctor) {
        //TODO: Crear exception personalizada.
        throw new NotFoundException(`Doctor code ${code} not found`);
      }

      return doctor;
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
