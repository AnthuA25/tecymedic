import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctors/doctors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    PatientsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tecymed'),
    DoctorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tecymed_db',
      autoLoadEntities: true, //* Carga automaticamente las entidades - solo local
      synchronize: true, //* Sincroniza en entorno de desarrollo, no usar en producción
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
