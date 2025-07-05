import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService {

  constructor(@InjectModel(Patient.name) private patientModule: Model<PatientDocument>,) {}

  async create(createPatientDto: CreatePatientDto) {
    // TODO:DEFINIR EL CODE Y ENCRIPTAR LA CONTRASEÑA
    const patientData = new this.patientModule(createPatientDto);
    const result = await patientData.save();
    return {
      success: true,
      message: 'Patient created successfully',
      patient_id: result._id,
    }
  }

  async findAll() {
    return {
      success: true,
      patients: await this.patientModule.find().exec(),
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

}
