import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid',)
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    speciality: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    license:string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
    code: string;

    @Column({default:() => 'CURRENT_TIMESTAMP', type: 'timestamp'})
    created_at: Date;

    @Column({default:() => 'CURRENT_TIMESTAMP', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    @Column({ default: true, type: 'boolean' })
    status:boolean;

    @DeleteDateColumn({select:false})
    deleted_at: Date; //* Captura la fecha de eliminación lógica del registro, no elimina físicamente el registro
}
