import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('user', 'youtube-clone') private userModel: Model<UserDocument>,
  ) { }

  async create(user: any) {
      const user_Indb = await this.userModel.findOne({ email: user.email})
      if(!user_Indb){
        console.log(1);
        const newUser = new this.userModel();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.photoUrl = user.picture;
        const _user = await newUser.save(); 
        return _user;
      }
      if(user_Indb){
        console.log(`user with email:${user.email} has just logined `)
      }
  }

  findAll() {
    return this.userModel.find({});
  }

  async findUserId(email: string) {
    try {
      if (email) {
        const user = await this.userModel.findOne({
          email: email
        });
        return user._id;
      } else {
        return '';
      }
    } catch (err) {
      return err;
    }
  }

  async subscribeUser(_id: string, email: string) {
    try {
      const user = await this.userModel.findOne({
        _id: _id
      })
      const user_Sub = await this.userModel.findOne({
        email: email
      })
      if(user.subscriberList.includes)
      user.subscriberList.push(user_Sub);
      user.subscribers = user.subscribers + 1;

      const updateUser = await user.save();
      return updateUser;
    } catch (err) {
      console.log(err);
    }
  }

  async unsubscribeUser(_id: string, email: string) {
    try {
      const user = await this.userModel.findOne({
        _id: _id
      }).exec();

      const user_Sub = await this.userModel.findOne({
        email: email
      }).exec();

      if (user.subscriberList.includes(user_Sub._id)) {
        let i = user.subscriberList.indexOf(user);
        user.subscriberList.splice(i, 1);
        user.subscribers = user.subscribers - 1;
      }

      const updateUser = await user.save();
      return updateUser;
    } catch (err) {
      console.log(err);
    }
  }

  async findOneUser(email:string){
    try{
      return await this.userModel
      .findOne({email})
      .populate('subscriberList', '_id name photoUrl', this.userModel)
      .exec();
    }catch(err){
      console.log(err);
    }

  }

  async findUserSubscribeList(email:string){
    try{
      const userToSub =  await this.userModel
      .findOne({email}).exec();
      const subList = await this.userModel.find({ subscriberList: { $in: [ Object(userToSub._id) ] }});
      return subList;
    }catch(err){
      console.log(err);
    }

  }

}
