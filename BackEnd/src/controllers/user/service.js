"use strict";

const mailSender = require("../../functions/mail");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

// 비밀번호를 잊어버려, 랜덤 비밀번호 변경을 함. 2차적인, 본인인증과정이 필요함.
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
