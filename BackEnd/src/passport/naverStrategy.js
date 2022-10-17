"use strict";

var NaverStrategy = require("passport-naver").Strategy;
var passport = require("passport");
const config = require("config");

passport.use(
    new NaverStrategy(
        {
            clientID: config.get("naver.clientID"),
            clientSecret: config.get("naver.clientSecret"),
            callbackURL: config.get("naver.callbackURL"),
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                var user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    provider: "naver",
                    naver: profile._json,
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
