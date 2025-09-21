import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { get } from 'http';
import * as mysql from 'mysql2';

//konfigurasi mysql
const db: any = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin1234',
    database: 'rekweb1',
  })
  .promise();

@Controller('auth')
export class AuthController {
  //   @Get()
  //   async getUserData(): Promise<any> {
  //     try {
  //       const [data]: any = await db.query('select * from mahasiswa');
  //       return data;
  //     } catch (err) {
  //       return err;
  //     }
  //   }

  //buat login
  @Post('/login')
  async login(
    @Body('akun') akun: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      const [rows]: any = await db.query(
        'SELECT * FROM user_admin WHERE akun = ? AND password = ?',
        [akun, password],
      );
      if (rows.length > 0) {
        // Buat JWT token
        const token = jwt.sign(
          { id: rows[0].id, akun: rows[0].akun },
          'SECRET_KEY', // Ganti dengan secret key yang aman
          { expiresIn: '1h' },
        );
        // Set token di cookie
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000, // 1 jam
        });
        // Redirect ke dashboard admin
        return res.redirect('/admin/dashboard');
      } else {
        return res
          .status(401)
          .json({ success: false, message: 'Akun atau password salah' });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  }

  // Logout
  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.redirect('/');
  }
}
