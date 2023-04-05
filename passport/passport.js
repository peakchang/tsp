// auth/passport.js

import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as NaverStrategy } from "passport-naver";
// import { Strategy as KakaoStrategy } from "passport-kakao";

import { User } from "../db/models";

export default (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // (2) - 로그인 인증 성공 시 한 번만 실행
    passport.serializeUser((user, done) => {
        done(null, user.id); // 세션에 사용자 정보인 id를 저장
    });
    // (3) - 로그인 인증이 되어있는 경우, 요청할 때마다 실행
    passport.deserializeUser(async (id, done) => {
        // 세션에 저장되어 있는 id를 인자 값으로 전달받음
        try {
            const user = await User.findOne({
                where: {
                    id,
                },
                raw: true,
            });
            done(null, user); // req.user 객체 생성
        } catch {
            done(null, false, {
                message: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
            });
        }
    });

    // (1)
    passport.use(
        new LocalStrategy(
            {
                session: true, // 세션 저장 여부
                usernameField: "id", // form > input name
                passwordField: "password",
            },
            async (id, password, done) => {
                try {
                    // 회원정보 조회
                    const user = await User.findOne({
                        where: {
                            email: id,
                        },
                        raw: true,
                    });

                    // 회원정보가 없거나 비밀번호가 일치하지 않는 경우
                    if (!user || user.password !== password) {
                        done(null, false, {
                            message:
                                "존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.",
                        });
                    } else {
                        done(null, user); // serializeUser로 user 전달
                    }
                } catch {
                    done(null, false, {
                        message: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
                    });
                }
            }
        )
    );
};