import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.headers['security-password'] === process.env.SECURITY_PASSWORD) {
      next();
    } else {
      throw new BadRequestException("You don't have a security password");
    }
  }
}
