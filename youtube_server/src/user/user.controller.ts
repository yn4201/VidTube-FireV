import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Req() req: any) {
    return await this.userService.create(req.user);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('id')
  getUserId(@Req() req: any) {
    return this.userService.findUserId(req.user.email);
  }

  @Get('info')
  getOneUserInfo(@Req() req: any) {
    return this.userService.findOneUser(req.user.email);
  }

  @Get('toSubList')
  getUserToSubList(@Req() req: any) {
    return this.userService.findUserSubscribeList(req.user.email);
  }

  @Put('subscribe/:id')
  async subscribe(@Param('id') id: string, @Req() req: any) {
    console.log(`user with id ${id} was subscribed by this ${req.user.email} user`);
    return await this.userService.subscribeUser(id, req.user.email);
  }

  @Put('unsubscribe/:id')
  async unsubscribe(@Param('id') id: string, @Req() req: any) {
    console.log(`user with id ${id} was unsubscribed by this ${req.user.email} user`);
    return await this.userService.unsubscribeUser(id, req.user.email);
  }

}

