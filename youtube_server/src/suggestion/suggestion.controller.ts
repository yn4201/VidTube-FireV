import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';


@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {
  }

  @Get('search')
  async SearchForSuggestion(@Query('key') key : string){
    console.log("Searching... with the title: " + key)
    let data = await this.suggestionService.findAllTitleData();
    let result = this.suggestionService.search(key,data);
    return result;
  }

  @Get('all')
  FindAllSuggestion(){
    let result = this.suggestionService.findAllTitleData();
    return result;
  }

  @Post('add')
  AddSuggestionToDB(@Body() body : any){
    return this.suggestionService.createTitleData(body);
  }
}
