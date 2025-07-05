import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PatientsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tecymed'),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
