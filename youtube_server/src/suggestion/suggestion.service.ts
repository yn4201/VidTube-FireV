import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suggestion, SuggestionDocument } from 'src/models/suggestion.schema';


@Injectable()
export class SuggestionService {
  constructor(@InjectModel('suggestion', 'youtube-clone') private suggestionModel: Model<SuggestionDocument>,) {
  }

  async findAllTitleData(){
    return await this.suggestionModel
    .find({ isExist : true})
    .select('-__v -updatedAt -createdAt');
  }

  async createTitleData(video: any){
    const newSuggestion = new this.suggestionModel();
    newSuggestion.title = video.title;
    newSuggestion.video_id = video._id;
    newSuggestion.isExist = false;
    return await newSuggestion.save();
  }

  stringToVect(textInput: string, dict: Array<string>) {
    //remove special character
    // textInput = textInput.replace(/[^\w\s]/gi, '');
    //split string to array
    let words = textInput.split(" ").map((w) => w.toLowerCase());
    let vec = [];
    //update dictionary
    for (let i = 0; i < words.length; i++) {
      if (dict.indexOf(words[i]) == -1) {
        dict.push(words[i]);
      }
    }

    //create vector
    for (let i = 0; i < dict.length; i++) {
      vec.push(words.indexOf(dict[i]) == -1 ? 0 : 1);
    }
    return [vec, dict];
  }

  distance(vec1: any, vec2: any) {
    let dist = 0;
    
    if (vec1[0].length != vec2[0].length) {
      //padding with zero values
      let maxLen = Math.max(vec1[0].length, vec2[0].length);
      for (let i = vec1[0].length; i < maxLen; i++) {
        vec1[0].push(0);
      }
      for (let i = vec2[0].length; i < maxLen; i++) {
        vec2[0].push(0);
      }
    }
    // console.log(vec1[0].length,vec2[0].length)
    // console.log(vec1,vec2);
    for (let i = 0; i < vec1[0].length; i++) {
      dist += Math.pow(Number(vec1[0][i]) - Number(vec2[0][i]), 2);
    }
    // console.log("pow: " + dist);
    return Math.sqrt(dist);
  }

  search(keywords: string, data: any) {
    let dict = [];
    let vecSearch = this.stringToVect(keywords, dict);
    // console.log(vecSearch);
    for (let i = 0; i < data.length; i++) {
      data[i].vec = this.stringToVect(data[i].title, dict);
      // console.log(data[i].vec)
    }
    //calc distance
    for (let i = 0; i < data.length; i++) {
      data[i].dist = this.distance(vecSearch, data[i].vec);
      // console.log(data[i].vec)
    }
    //sort by distance
    data.sort((a: { dist: number; }, b: { dist: number; }) => a.dist - b.dist);
    // console.log(data);
    return data;
  }

  
  async deleteTitleData(video_id: any) {
    await this.suggestionModel.deleteMany({
        video_id
    }).exec();
  }

  async updateSuggestStatus(video_id){
    await this.suggestionModel.findOneAndUpdate({video_id},{isExist:true}).exec();
  }


}
