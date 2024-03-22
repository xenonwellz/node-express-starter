import { v2 as cloudinary } from "cloudinary";
import logger from "./logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function upload(
  file: string
): Promise<{ url: string; id: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, { resource_type: "auto" })
      .then((value) => {
        logger.info(`file uploaded with public_id ${value.public_id}`);
        return resolve({ url: value.secure_url, id: value.public_id });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function uploadMultiple(
  files: string[]
): Promise<{ url: string; id: string }[]> {
  return new Promise((resolve, reject) => {
    const promises = files.map((file) => upload(file));
    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
}

export async function remove(public_id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(public_id)
      .then(() => {
        logger.info(`file with public_id ${public_id} removed`);
        return resolve(true);
      })
      .catch((err) => reject(err));
  });
}

export async function removeMultiple(public_ids: string[]): Promise<boolean[]> {
  return new Promise((resolve, reject) => {
    const promises = public_ids.map((public_id) => remove(public_id));
    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
}
