// api/images.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.join(process.cwd(), 'public', 'images');
  try {
    const files = await fs.readdir(dir);
    const images = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Unable to read images directory." });
  }
}
