"use strict";

const KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");
const config = require("config");

const User = require("../models/user");

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: config.get("kakao.clientID"),
                callbackURL: config.get("kakao.callbackURL"),
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("kakao profile", profile);
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: "kakao" },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: "KAKAO" + profile._json.kakao_account.email,
                            username: profile.displayName,
                            snsId: profile.id,
                            provider: "kakao",
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
