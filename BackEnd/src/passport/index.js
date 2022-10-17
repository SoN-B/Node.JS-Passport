"use strict";

const passport = require("passport");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");

module.exports = () => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (req, user, done) {
        // passport로 로그인 처리 후 해당 정보를 session에 담는다.
        req.session.sid = user.name;
        console.log("Session Check :" + req.session.sid);
        done(null, user);
    });

    kakao();
    naver();
};
