import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
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

    @Prop()
    code: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({required: true, select: false})
    password: string;

    @Prop({ default: () => Date.now() })
    created_at: Date;

    @Prop({ default: () => Date.now() })
    updated_at: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);