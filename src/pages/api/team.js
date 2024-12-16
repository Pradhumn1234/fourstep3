import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Teammember from '@/models/admin/Teammember';
import dbConnect from '@/utils/db';

// Determine the upload directory based on the environment
const uploadDirectory = process.env.VERCEL ? '/tmp/uploads/TeamImages' : './public/uploads/TeamImages';

// Ensure directory exists (on Vercel, we create it inside /tmp, which is ephemeral)
if (process.env.VERCEL) {
  try {
    // Ensure the directory exists inside /tmp (will be cleared after each function execution)
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating upload directory:', err);
  }
} else {
  // On VPS, make sure the directory exists
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the directory based on the environment (Vercel or VPS)
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const apiRoute = async (req, res) => {
  await dbConnect();

  if (req.method === 'POST') {
    // Handle file upload with Multer
    upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      } else if (err) {
        console.error('Unknown error during file upload:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      const { name, description, designation, link1, link2, altText } = req.body;

      const fileData = req.file && {
        name,
        description,
        designation,
        link1,
        link2,
        altText,
        filename: req.file.filename,
        path: process.env.VERCEL ? `/uploads/TeamImages/${req.file.filename}` : `/public/uploads/TeamImages/${req.file.filename}`,
      };

      console.log('fileData------------------------------------> ', fileData);

      try {
        const file = await Teammember.create(fileData);
        return res.status(200).json({ data: file });
      } catch (error) {
        console.error('Error updating or saving file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } else if (req.method === 'GET') {
    // Handle fetching files
    try {
      const files = await Teammember.find({});
      return res.status(200).json({ data: files });
    } catch (error) {
      console.error('Error fetching files:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
