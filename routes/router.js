import express from 'express';
import multer from 'multer';
import { postlogin, getprofile, logout, tugaspost, getreport, getalbum, albumrole } from '../controller/control.js'
import { authmiddleware, requireauth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer()

//router.get('/', getlogin);

router.post('/login', postlogin);
router.get('/auth', requireauth, getprofile)
router.post('/logout', requireauth, logout)
router.post('/tugas', requireauth, tugaspost)
router.get('/laporan', getreport)
router.get('/album', getalbum)
router.post('/upload', requireauth, upload.single("image"), albumrole)


export default router;