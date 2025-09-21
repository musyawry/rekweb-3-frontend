import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const token =
      req.cookies?.token ||
      req.headers['authorization']?.replace('Bearer ', '');
    console.log('JwtAuthGuard: token from cookie/header =', token);
    if (!token) {
      console.log('JwtAuthGuard: Token not found, redirecting.');
      res.redirect('/');
      return false;
    }
    try {
      jwt.verify(token, 'SECRET_KEY'); // Ganti dengan secret key yang sama seperti saat login
      console.log('JwtAuthGuard: Token valid.');
      return true;
    } catch (err) {
      console.log('JwtAuthGuard: Token invalid or expired:', err);
      res.redirect('/');
      return false;
    }
  }
}
