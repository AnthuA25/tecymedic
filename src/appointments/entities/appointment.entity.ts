import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    appointment_date: string;

    //TODO: Mejorar la relación desde el entity
    @ManyToOne(() => Doctor, { eager: true })
    doctor: Doctor;

    @Column({ type: 'int', nullable: false })
    level: number;

    @Column({ type: 'varchar', length: 100, nullable: false, default: 'pending' })
    appointment_status: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    created_user: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    updated_user: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: string;

    @DeleteDateColumn({ select: false })
    deleted_at: Date; //* Capturar la fecha de eliminación.
}
