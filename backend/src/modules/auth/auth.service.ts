import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: { userID: number }) {
    const token = this.jwtService.sign(payload);
    return { token: token };
  }
}
