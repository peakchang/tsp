import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const authRouter = express.Router();

authRouter.post('/join', async (req, res, next) => {
    let err_message = {}
    try {
        const hash = await bcrypt.hash(req.body.getpwd, 12);
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const joinArr = [req.body.getemail, hash, req.body.getnick, req.body.getname, now]
        const joinSql = "INSERT INTO users (user_email, user_pwd, user_name, user_nick, user_created_at) VALUES (?,?,?,?,?)";
        await sql_con.promise().query(joinSql, joinArr);
    } catch (error) {
        if (error.message.includes('user_email')) {
            err_message = { err_message: '이미 가입된 아이디 입니다.' }
        } else if (error.message.includes('user_nick')) {
            err_message = { err_message: '이미 가입된 닉네임 입니다.' }
        }
    }
    res.json(err_message)

})

authRouter.use('/chk', (req, res, next) => {
    console.log('로그 안찍으면 뭐 안하니??');
    if (req.user) {

        // let userInfo = Object.assign({}, req.user);
        let userInfo = { ...req.user };
        delete userInfo.user_id
        delete userInfo.user_pwd
        delete userInfo.user_created_at
        delete userInfo.user_deleted_at
        delete userInfo.user_updated_at
        return res.json({ loginChk: 'yes', userInfo })
    } else {
        console.log('씨바아아아아알');
        res.json({ loginChk: '' })
    }
})


authRouter.post('/login', (req, res, next) => {

    var movePath = ''
    passport.authenticate('local', (authError, user, errInfo) => {
        console.log('(auth router)');
        if (authError) {
            console.error(authError);
            return res.json({ error: '로그인을 할수 없습니다. 관리자에게 문의해주세요' })
        }
        if (!user) {
            return res.json(errInfo)
        }

        return req.login(user, async (loginError) => {
            if (loginError) {
                console.error(loginError);
                return res.json({ error: '로그인 실패! 관리자에게 문의해주세요' })
            } else {
                var userId = {
                    user_id: user.idx
                }
            }
            return res.json(userId)
        });
    })(req, res, next) // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
})

authRouter.use('/logout', (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            req.logout();
            req.session.destroy(); // 선택사항
        }
    } catch (error) {
        console.error(error);
    }
    res.status(200).json({ result: 'success' })
})

authRouter.use('/chk_user', (req, res, next) => {
    console.log(req.isAuthenticated());
    res.json({ test: 'success!' })
})

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get('/kakao/callback', passport.authenticate('kakao', {
    failureMessage: {
        message: 'fail!!!'
    }
}), (req, res) => {
    res.redirect('http://localhost:5173/auth/provider')
    // res.redirect('/')
});




export { authRouter }