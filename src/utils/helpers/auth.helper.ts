import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomFill,
  scrypt,
} from 'crypto';

export const encryptText = async (data: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');

  return new Promise((resolve, reject) => {
    scrypt(process.env.ENCRYPTION_PASSWORD, salt, 24, (err, key) => {
      if (err) reject(err);

      randomFill(new Uint8Array(16), (err, iv) => {
        const ivHex = Buffer.from(iv).toString('hex');
        if (err) reject(err);

        const cipher = createCipheriv(
          process.env.ENCRYPTION_ALGORITHM,
          key,
          iv,
        );

        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const result = `${salt}|${ivHex}|${encrypted}`;
        resolve(result);
      });
    });
  });
};

export const decryptText = async (encryptedData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const [salt, ivHex, encrypted] = encryptedData.split('|');

    if (!salt || !ivHex || !encrypted)
      reject(new Error('Decryption Error: Invalid data'));

    const iv = Buffer.from(ivHex, 'hex');

    scrypt(process.env.ENCRYPTION_PASSWORD, salt, 24, (err, key) => {
      if (err) reject(err);

      const decipher = createDecipheriv(
        process.env.ENCRYPTION_ALGORITHM,
        key,
        iv,
      );

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      resolve(decrypted);
    });
  });
};
