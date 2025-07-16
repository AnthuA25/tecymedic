import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type PatientDocument = Patient & Document;
//TODO: Agregar @Prop de eliminacion logica
@Schema({ versionKey: false })
export class Patient {
    @Prop({ type: String, default: uuidv4, select: false })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    document_number: string;

    @Prop({ required: true })
    document_type: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop({unique: true})
    code: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ default: () => Date.now() })
    created_at: Date;

    @Prop({ default: () => Date.now() })
    updated_at: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
