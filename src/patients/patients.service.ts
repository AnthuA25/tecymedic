import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDocument } from './schemas/patient.schema';
import  * as bcrypt from 'bcrypt';
@Injectable()
export class PatientsService {

  private readonly logger = new Logger(PatientsService.name);

  constructor(@InjectModel(Patient.name) private patientModule: Model<PatientDocument>,) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patientData = new this.patientModule({
        ...createPatientDto,
        code: this.generateCode(),
        password: await this.hashPassword(createPatientDto.password),
      });
      const result = await patientData.save();
      return {
        success: true,
        message: 'Patient created successfully',
        patient_code: result.code,
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return {
        success: true,
        patients: await this.patientModule.find().exec(),
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  async findCode(code: string) {
    try {
      //TODO: Implementar validacion de busqueda vacia
      return await this.patientModule.findOne({ code }).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  private generateCode() {
    return `PAT${Date.now()}`
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

}
