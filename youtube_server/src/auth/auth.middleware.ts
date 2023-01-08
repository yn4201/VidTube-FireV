import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private authService: AuthService){

  }
  async use(req: any, res: any, next: () => void) {
    let idToken = req.headers['authorization'];
    // console.log(req.headers);
    // console.log(req.headers['authorization']);
    // console.log(idToken);

    if(idToken == undefined){
      res.status(401).send('Unauthorized');
      return;
    }
    let verifiedToken = await this.authService.verifyToken(idToken);
    if(verifiedToken == null){
      res.status(401).send("Permission denied");
      return;
    }
    req.user = verifiedToken;
    // console.log('ok');
    next();
  }
}
