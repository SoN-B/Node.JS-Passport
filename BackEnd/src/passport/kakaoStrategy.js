"use strict";

var KakaoStrategy = require("passport-kakao").Strategy;
var passport = require("passport");
const config = require("config");

module.exports = () => {
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
};
