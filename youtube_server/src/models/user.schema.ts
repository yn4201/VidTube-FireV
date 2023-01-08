import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Video } from './video.schema';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @IsNotEmpty()
    @Prop()
    name: string;

    @Prop({ default: "" })
    photoUrl: string;

    @Prop({ default: 0})
    subscribers: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    subscriberList: User[];

    // @Prop(
    //     {
    //         lowercase: true,
    //         required: [true, "Email address is required"],
    //         validate: [validateEmail, "Please fill a valid email address"],
    //         // match: [
    //         //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //         //     "Please fill a valid email address",
    //         //   ],
    //     }
    // )
    // email: string;

    @IsEmail()
    @Prop()
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);