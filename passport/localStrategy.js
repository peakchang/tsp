import passport from 'passport';
import bcrypt from "bcrypt";
import { Strategy as localStrategy } from 'passport-local';
import { sql_con } from '../lib/back_lib/set_db.js';

export const local = () => {
    passport.use(new localStrategy({
        usernameField: 'getemail',
        passwordField: 'getpwd',
    }, async (getemail, getpwd, done) => {
        try {
            let getUserSql = `SELECT * FROM users WHERE user_email = '${getemail}';`;
            const getUser = await sql_con.promise().query(getUserSql)
            let exUser = getUser[0]
            if (exUser[0]) {
                const result = await bcrypt.compare(getpwd, exUser[0].user_pwd);
                if (result) {
                    done(null, exUser[0]);
                } else {
                    done(null, false, { error: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { error: '가입된 아이디가 없습니다.' });
            }

        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};

