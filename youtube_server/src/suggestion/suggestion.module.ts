import { Module } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionSchema } from 'src/models/suggestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'suggestion', schema: SuggestionSchema }],'youtube-clone'),
  ],
  controllers: [SuggestionController],
  providers: [SuggestionService],
  exports: [SuggestionService]
})
export class SuggestionModule {}
