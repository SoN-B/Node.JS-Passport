"use strict";

const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

exports.login_local = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        //info.message
        if (!user) {
            return res.status(404).json({
                message: info.message,
                code: 404,
            });
        }

        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({
                message: "Local login success.",
                code: 200,
                user: user,
            });
        });
    })(req, res, next);
};

exports.register = async (req, res) => {
    const { username, email, password, position, interested } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.status(401).json({
                message: "Email already exists.",
                code: 401,
            });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            username: username,
            email: email,
            password: hash,
            position: position,
            interested: interested,
        })
            .then(() => {
                return res.status(200).json({
                    message: "Register success.",
                });
            })
            .catch((err) => {
                return res.status(500).json({ err });
            });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.login_naver = (req, res) => {
    console.log("/login router 실행");
};

exports.login_naver_callback = (req, res) => {
    passport.authenticate("naver", (err, user) => {
        console.log("passport.authenticate(naver)실행");

        if (!user) {
            return res.status(404).json({
                message: "Naver user not found.",
                code: 404,
            });
        }
        req.logIn(user, (err) => {
            console.log("naver/callback user : ", user);
            return res.status(200).json({
                message: "Naver login success.",
                code: 200,
                user: user,
            });
        });
    })(req, res);
};

exports.login_kakao = (req, res) => {
    console.log("/login router 실행");
};

exports.login_kakao_callback = (req, res) => {
    passport.authenticate("kakao", (err, user) => {
        console.log("passport.authenticate(kakao)실행");

        if (!user) {
            return res.status(404).json({
                message: "Kakao user not found.",
                code: 404,
            });
        }
        req.logIn(user, (err) => {
            console.log("kakao/callback user : ", user);
            return res.status(200).json({
                message: "Kakao login success.",
                code: 200,
                user: user,
            });
        });
    })(req, res);
};

exports.logout = (req, res) => {
    console.log("logout");
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            message: "Logout success.",
            code: 200,
        });
    });
    // req.session.save((err) => {
    //     if (err) throw err;
    // return res.status(200).json({
    //     message: "Logout success.",
    //     code: 200,
    // });
    // });
};
