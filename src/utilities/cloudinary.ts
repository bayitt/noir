import { v2 as cloudinary } from 'cloudinary';
import { Upload } from 'src/modules/article/inputs';
import { ConfigService } from 'src/modules/config/config.service';
import { generateRandomString } from '.';

const initCloudinary = (configService: ConfigService) => {
  cloudinary.config({
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_SECRET'),
    secure: true,
  });
};

export const uploadImage = async (
  configService: ConfigService,
  upload: Upload,
): Promise<string> => {
  initCloudinary(configService);
  const public_id =
    generateRandomString(Number((Math.random() * 10).toFixed(0) as any)) +
    generateRandomString(Number((Math.random() * 10).toFixed(0) as any), true);
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: configService.get('CLOUDINARY_FOLDER') + '/articles',
        public_id,
        access_mode: 'public',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);

        if (result) resolve(result?.url);
      },
    );

    upload.createReadStream().pipe(stream);
  });
};

export const deleteImage = async (
  configService: ConfigService,
  image: string,
) => {
  initCloudinary(configService);
  const public_id = `${configService.get('CLOUDINARY_FOLDER')}/articles/${
    image.split('/articles/')[1].split('.')[0]
  }`;
  await cloudinary.uploader.destroy(public_id);
};
