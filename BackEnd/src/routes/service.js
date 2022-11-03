"use strict";

const passport = require("passport");
const mailSender = require("../functions/mail");
const bcrypt = require("bcrypt");
const fs = require("fs");

const User = require("../models/user");

exports.home = (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
};

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

exports.search_password = async (req, res, next) => {
    try {
        const email = req.body.email;

        let random = Math.random().toString(12).slice(2); // 랜덤숫자 12진수 변환후 저장
        const hash = await bcrypt.hash(random, 12);

        const isUser = await User.findOne({ where: { email: email } });

        if (!isUser) {
            return res.status(404).json({
                message: "This email does not exist.",
                code: 404,
            });
        } else {
            if (isUser.provider != "local") {
                return res.status(403).json({
                    message: "Kakao and Naver accounts cannot be changed.",
                    code: 403,
                });
            } else {
                await User.update(
                    {
                        password: hash,
                    },
                    {
                        where: { email: email },
                    }
                );
            }
        }

        let emailParam = {
            toEmail: email, // 수신할 이메일
            subject: "From SnackTime for Change Password!", // 메일 제목
            html: `<p>새로운 비밀번호입니다.</p><p>아래의 비밀번호를 통해 로그인한 후, <b>마이페이지 > 나의 계정 > 비밀번호 설정</b>을 통해 비밀번호를 변경해 주세요.</p><h2>${random}</h2>`, //내용
        };

        mailSender.sendmail(emailParam);

        return res.status(200).json({
            message: `Authentication mail is sent to ${email}`,
        });
    } catch (err) {
        return res.status(500).json({
            message: `Failed to send authentication email to ${email}`,
        });
    }
};
