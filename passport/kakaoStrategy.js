import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { sql_con } from '../lib/back_lib/set_db.js';
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");


export const kakao = () => {
    console.log('여기로는 오는거야?!?!?!');
    console.log(process.env.KAKAO_APP_KEY);
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_APP_KEY,
        callbackURL: '/api/v4/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUserSql = `SELECT * FROM users WHERE user_snsid = '${profile.id}' AND user_provider = 'kakao';`;
            const exUserTemp = await sql_con.promise().query(exUserSql)
            const exUser = exUserTemp[0][0]
            if (exUser) {
                done(null, exUser);
            } else {
                console.log(profile);
                console.log(profile._json);
                console.log(profile._json.kakao_account.email);
                const now = moment().format('YYYY-MM-DD HH:mm:ss')
                const createKakaoUserSql = `INSERT INTO users (user_email,user_name, user_nick, user_snsid, user_provider, user_thumbnail, user_created_at) VALUES (?, ?, ?, ?, 'kakao', ?, ?)`;
                const kakaoUserArr = [
                    profile._json.kakao_account.email,
                    profile.displayName,
                    profile.displayName,
                    profile.id,
                    profile._json.kakao_account.profile.thumbnail_image_url,
                    now
                ];
                await sql_con.promise().query(createKakaoUserSql, kakaoUserArr)

                const getNewUserSql = `SELECT * FROM users WHERE user_snsid = '${profile.id}' AND user_provider = 'kakao';`;
                const getNewUserTemp = await sql_con.promise().query(getNewUserSql)
                const newUser = getNewUserTemp[0][0]
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
