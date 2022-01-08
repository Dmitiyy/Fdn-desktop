import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: string) {
    if (file.length !== 0) {
      const result = await cloudinary.uploader.upload(file, { folder: 'Fdn/' });
      return result;
    }
  }
}
