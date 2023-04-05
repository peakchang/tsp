import passport from 'passport';
import { local } from './localStrategy.js';
import { kakao } from './kakaoStrategy.js';
import { sql_con } from '../lib/set_db.js';



export const passportConfig = () => {
    passport.serializeUser((user, done) => {
        console.log('serial gogogogogogo~~~~~');
        console.log(user);
        console.log(user.idx);
        done(null, user.idx); // 세션에 유저의 id만 저장
    });
    console.log('????');
    passport.deserializeUser(async (id, done) => {
        
        console.log(id);
        console.log('deserial gogogogogogo~~~~~');
        let getUserSql = `SELECT * FROM users WHERE idx = '?'`;
        console.log(getUserSql);

        const userInfo = await sql_con.promise().query(getUserSql, [id]);
        const user_info = userInfo[0][0]
        console.log(user_info);
        
        return done(null, user_info);
    });

    console.log('local 함수 실행?')

    local();
    kakao();
};


// export default passportConfig