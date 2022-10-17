"use strict";

var KakaoStrategy = require("passport-kakao").Strategy;
var passport = require("passport");
const config = require("config");

passport.use(
    new KakaoStrategy(
        {
            clientID: config.get("kakao.clientID"),
            callbackURL: config.get("kakao.callbackURL"),
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                var user = {
                    name: profile.displayName,
                    email: profile._json.kakao_account.email,
                    username: profile.displayName,
                    provider: "kakao",
                    kakao: profile._json,
                };
                console.log("user : ", user);
                return done(null, user);
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (req, user, done) {
    // passport로 로그인 처리 후 해당 정보를 session에 담는다.
    req.session.sid = user.name;
    console.log("Session Check :" + req.session.sid);
    done(null, user);
});

module.exports = passport;
