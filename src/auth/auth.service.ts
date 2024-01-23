import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    // Periksa keberadaan pengguna dan cocokkan kata sandi
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    // Gunakan ID pengguna untuk membuat payload JWT
    const payload = {
         id: user.id,
         email: user.email,
         name: user.name 
        
        };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
