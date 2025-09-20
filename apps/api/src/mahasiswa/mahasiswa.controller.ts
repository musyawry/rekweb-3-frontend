import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import * as mysql from 'mysql2';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//konfigurasi mysql
const db: any = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin1234',
    database: 'rekweb1',
  })
  .promise();

@Controller('mahasiswa')
export class MahasiswaController {
  // Ambil semua data mahasiswa
  @Get()
  async getAll() {
    try {
      const [rows]: any = await db.query('SELECT * FROM mahasiswa');
      return rows;
    } catch (err) {
      return { error: err };
    }
  }

  // Tambah data mahasiswa
  @Post()
  async create(@Body() body: any) {
    const { nim, nama, fakultas, prodi, angkatan } = body;
    try {
      const [result]: any = await db.query(
        'INSERT INTO mahasiswa (nim, nama, fakultas, prodi, angkatan) VALUES (?, ?, ?, ?, ?)',
        [nim, nama, fakultas, prodi, angkatan],
      );
      return { success: true, id: result.insertId };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  // Edit data mahasiswa
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const { nim, nama, fakultas, prodi, angkatan } = body;
    try {
      await db.query(
        'UPDATE mahasiswa SET nim = ?, nama = ?, fakultas = ?, prodi = ?, angkatan = ? WHERE id = ?',
        [nim, nama, fakultas, prodi, angkatan, id],
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  // Hapus data mahasiswa
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await db.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
