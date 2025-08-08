import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Services
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @description This function will check for Authorization header and verify it
   * using jwtService to make sure token is signed by our backend.
   * @author JV Abengona
   * @lastModified August 8, 2025
   */
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      // this returns 'Bearer <token>'
      const authorization = request.headers.authorization;
      const access_token = authorization?.split(' ')[1];

      if (!access_token) {
        throw new Error('Missing access token.');
      }

      // this automatically throw an error if jwtService in unable to verify the access_token
      const user_details = await this.jwtService.verifyAsync(access_token);

      request.user = {
        user_id: user_details.sub,
        user_profile_id: user_details.user_profile_id,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
