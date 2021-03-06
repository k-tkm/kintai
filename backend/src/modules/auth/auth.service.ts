import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: { userID: number }): Promise<{ token: string }> {
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
