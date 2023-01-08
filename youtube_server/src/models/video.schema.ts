import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import {IsNotEmpty } from 'class-validator';
export type VideoDocument = Video & Document;

@Schema(
    { timestamps: true }
)
export class Video {

    @Prop()
    url: string;

    @IsNotEmpty()
    @Prop()
    title: string;

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    dislikes: number;

    @Prop({ default: "" })
    description: string;

    @IsNotEmpty()
    @Prop()
    photoURL: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    owner: User;

    @Prop([String])
    hashtags: string[];

    @Prop({default: false})
    isHidden: boolean;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    likeList: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    dislikeList: User[];


}

export const VideoSchema = SchemaFactory.createForClass(Video);