import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DummyGuardGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const decodeToken = {
      userID: 'dummyUserID',
      name: 'dummyName',
      picture: 'dummyPicture',
    };
    req.body.userID = decodeToken.userID;
    req.body.userName = decodeToken.name;
    req.body.userPhoto = decodeToken.picture;
    return true;
  }
}
