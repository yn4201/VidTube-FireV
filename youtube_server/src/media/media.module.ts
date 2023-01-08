import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { forwardRef } from '@nestjs/common';
import { VideoModule } from 'src/video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/models/video.schema';
import { SuggestionModule } from 'src/suggestion/suggestion.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'video', schema: VideoSchema }],'youtube-clone'),
        forwardRef(() => VideoModule),
        forwardRef(() => SuggestionModule),
    ],
    controllers: [MediaController],
    providers: [MediaService],
    exports: [MediaService]
})
export class MediaModule { }