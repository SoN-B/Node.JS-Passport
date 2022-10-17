"use strict";

var NaverStrategy = require("passport-naver").Strategy;
var passport = require("passport");
const config = require("config");

module.exports = () => {
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
};
