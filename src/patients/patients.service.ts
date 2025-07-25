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

  constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDocument>,) {}

  async create(createPatientDto: CreatePatientDto): Promise<string> {
    try {
      const patientData = new this.patientModel({
        ...createPatientDto,
        code: this.generateCode(),
        password: await this.hashPassword(createPatientDto.password),
      });
      const result = await patientData.save();
      return result.code;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientModel.find().exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  async findCode(code: string): Promise<Patient> {
    try {
      const result = await this.patientModel.findOne({ code }).exec();
      
      if (!result) {
        //TODO: Crear exception personalizada.
        throw new NotFoundException(`Patient code ${code} not found`);
      }
      
      return result;
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
