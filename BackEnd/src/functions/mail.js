"use strict";

const nodemailer = require("nodemailer");
const config = require("config");

// 메일발송 객체
const mailSender = {
    // 메일발송 함수
    sendmail: function (param) {
        var transporter = nodemailer.createTransport({
            service: "Naver", // 메일 보내는 곳
            prot: 587,
            host: "smtp.naver.com",
            secure: false, // TLS 를 사용하지 않으면 false, 아니면 true
            requireTLS: true,
            auth: {
                user: config.get("senderInfo.user"), // 보내는 메일의 주소
                pass: config.get("senderInfo.pass"), // 보내는 메일의 비밀번호
            },
        });

        // 메일 옵션
        var mailOptions = {
            from: `"🍪스낵타임🍪" ${config.get("senderInfo.user")}`, // 보내는 메일의 주소
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            text: param.text, // 메일 내용
            html: param.html, // 메일 html
        };

        // 메일 발송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    },
};

module.exports = mailSender;
