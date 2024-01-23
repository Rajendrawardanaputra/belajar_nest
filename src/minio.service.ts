// // minio.service.ts
// import { Injectable } from '@nestjs/common';
// import * as Minio from 'minio';

// @Injectable()
// export class MinioService {
//   private readonly minioClient: Minio.Client;

//   constructor() {
//     this.minioClient = new Minio.Client({
//       endPoint: 'minio-server-address',
//       port: 9000,
//       useSSL: false,
//       accessKey: 'your-access-key',
//       secretKey: 'your-secret-key',
//     });
//   }

//   // Tambahkan metode untuk mengunggah dan mengunduh file di sini
// }
