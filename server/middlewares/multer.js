import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 8000 * 1024 * 1024 }, 
});


export default upload;