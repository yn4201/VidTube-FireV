import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/models/comment.schema';
import { UserDocument } from 'src/models/user.schema';
import { VideoDocument } from 'src/models/video.schema';


@Injectable()
export class CommentService {
    constructor(
        @InjectModel('user', 'youtube-clone') private userModel: Model<UserDocument>,
        @InjectModel('comment', 'youtube-clone') private commentModel: Model<CommentDocument>,
        @InjectModel('video', 'youtube-clone') private videoModel: Model<VideoDocument>,
      ) { }

    async createComment(comment: Comment,email: string, videoId: string){
        try{
            const video = await this.videoModel.findOne({
                _id : videoId
            })
            const user =  await this.userModel.findOne({
                email : email
            })
            const newComment = new this.commentModel(comment);
            newComment.user = user._id;
            newComment.video = video._id;
            const _comment = newComment.save();
            return _comment;
        }catch(err){
            console.log(err);
        }
    }

    async getAllCommentsFromVideo(_id: string){
        try{
            return await this.commentModel
            .find({ video: { _id:  [Object(_id)]  }})
            .populate('user', '_id name photoUrl', this.userModel)
            .sort({ createdAt: -1 });
        }catch(err){
            console.log(err);
        }
    }

    async deleteAllCommentFromVid(video_id:string){
        await this.commentModel.deleteMany({video : Object(video_id)}).exec();
    }
}
