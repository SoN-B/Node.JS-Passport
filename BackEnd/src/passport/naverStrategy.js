"use strict";

const NaverStrategy = require("passport-naver").Strategy;
const passport = require("passport");
const config = require("config");

const User = require("../models/user");

module.exports = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: config.get("naver.clientID"),
                clientSecret: config.get("naver.clientSecret"),
                callbackURL: config.get("naver.callbackURL"),
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("naver profile", profile);
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: "naver" },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile.emails[0].value,
                            username: profile.displayName,
                            snsId: profile.id,
                            provider: "naver",
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
