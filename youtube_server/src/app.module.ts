import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { AuthService } from './auth/auth.service';
import databaseConfig from './configs/database.config';
import { AuthMiddleware } from './auth/auth.middleware';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SuggestionModule } from './suggestion/suggestion.module';
import { CloudMessageModule } from './cloud-message/cloud-message.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig().appDatabase, { connectionName: 'youtube-clone' }),
    UserModule,
    VideoModule,
    CommentModule,
    MediaModule,
    SuggestionModule,
    CloudMessageModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'video/all', method: RequestMethod.GET },
        { path: 'comment/all', method: RequestMethod.GET },
        { path: 'suggestion/search', method: RequestMethod.GET },
        // { path: 'suggestion/all', method: RequestMethod.GET },
        // { path: 'video/all/thumb', method: RequestMethod.GET },
        // { path: 'video/all/vid', method: RequestMethod.GET },
        // { path: 'video/one/', method: RequestMethod.GET },
        // { path: 'video/entire/', method: RequestMethod.GET },
        // { path: 'video/views/', method: RequestMethod.PUT },
        'comment/all/(.*)',
        // 'video/all/(.*)',
        'video/one/(.*)',
        'video/entire/(.*)',
        'video/views/(.*)',
        'uploads/vids/cvt/(.*)'
      ).forRoutes(
        {
          path: '*',
          method: RequestMethod.ALL
        })
  }
}
