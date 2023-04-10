import express from "express";
import { sql_con } from "../lib/back_lib/set_db.js";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import multer from "multer";
import fs from 'fs'
moment.tz.setDefault("Asia/Seoul");

const boardRouter = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        // 경로를 설정
        destination(req, file, cb) {
            console.log('일단 폴더 체크 부터!!!');
            const now = moment().format('YYMMDD')
            console.log(now);

            try {
                fs.readdirSync(`uploads`);
            } catch (error) {
                fs.mkdirSync(`uploads`);
            }

            try {
                fs.readdirSync(`uploads/editor`);
            } catch (error) {
                fs.mkdirSync(`uploads/editor`);
            }

            try {
                fs.readdirSync(`uploads/editor/editor${now}`);
            } catch (error) {
                fs.mkdirSync(`uploads/editor/editor${now}`);
            }
            cb(null, `uploads/editor/editor${now}`);
        },
        filename(req, file, cb) {
            //파일명 설정
            cb(null, file.originalname);
        },
    }),
    // limits: { fileSize: 10 * 1024 * 1024 },
});

boardRouter.post('/editor_img_uploads', upload.single('editorimg'), (req, res, next) => {
    const now = moment().format('YYMMDD')
    var baseUrl = req.protocol + '://' + req.get('host') + '/editor_img/editor' + now + '/' + req.file.filename;
    var getFolder = `uploads/editor/editor${now}`;
    res.json({ baseUrl, getFolder })
})

boardRouter.post('/editor_uploads', async (req, res, next) => {
    console.log(req.body);
    const now = moment().format('YYMMDD')
    const yesterday = moment().subtract(1, 'day').format('YYMMDD')
    if (req.body.delArr) {
        let folderList = [`uploads/editor/editor${now}`, `uploads/editor/editor${yesterday}`];
        for await (const delFile of req.body.delArr) {
            for (let i = 0; i < folderList.length; i++) {
                let chkDir = fs.existsSync(folderList[i]);
                if (chkDir) {
                    try {
                        fs.unlinkSync(folderList[i] + '/' + delFile)
                    } catch (error) {
                        console.log(error);
                    }

                }
            }
        }
    }
    res.json({ test: 'dldldld' })
})


const upload_on = multer({
    storage: multer.diskStorage({
        // 경로를 설정
        destination(req, file, cb) {
            console.log('일단 폴더 체크 부터!!!');
            const now = moment().format('YYMMDD')
            console.log(now);

            try {
                fs.readdirSync(`uploads`);
            } catch (error) {
                fs.mkdirSync(`uploads`);
            }

            try {
                fs.readdirSync(`uploads/img`);
            } catch (error) {
                fs.mkdirSync(`uploads/img`);
            }

            try {
                fs.readdirSync(`uploads/img/img${now}`);
            } catch (error) {
                fs.mkdirSync(`uploads/img/img${now}`);
            }
            cb(null, `uploads/img/img${now}`);
        },
        filename(req, file, cb) {
            //파일명 설정
            cb(null, file.originalname);
        },
    }),
    // limits: { fileSize: 10 * 1024 * 1024 },
});


boardRouter.post('/img_uploads', upload_on.single('onimg'), (req, res, next) => {
    const now = moment().format('YYMMDD')
    var baseUrl = req.protocol + '://' + req.get('host') + '/on_img/img' + now + '/' + req.file.filename;
    var getFolder = `uploads/img/img${now}`;
    res.json({ baseUrl, getFolder })
})
boardRouter.post('/delete_img', async (req, res, next) => {
    console.log(req.body);

    var getFileUrl = `uploads/img/${req.body.getFolder}/${req.body.getImgName}`;
    fs.unlink(getFileUrl, err => {
        console.log(err);
    });

})

boardRouter.post('/list_img_uploads', upload_on.single('onimg'), (req, res, next) => {
    
})



boardRouter.use('/test_form', (req, res, next) => {
    console.log('post는 되는거야?!?!?!?');
    console.log(req.body);
    // console.log(req.file);
    res.json({ message: 'gogogogo' })
})

export { boardRouter }