import { Module } from '@nestjs/common';
import { MahasiswaController } from './mahasiswa.controller';

@Module({
  controllers: [MahasiswaController],
})
export class MahasiswaModule {}
