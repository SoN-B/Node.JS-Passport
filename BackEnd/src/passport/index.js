"use strict";

const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");

const User = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((req, id, done) => {
        // passport로 로그인 처리 후 해당 정보를 session에 담는다.
        User.findOne({ where: { id } })
            .then((user) => {
                req.session.sid = user.username;
                console.log("Session Check :" + req.session.sid);
                done(null, user);
            })
            .catch((err) => done(err));
    });

    local();
    kakao();
    naver();
};
