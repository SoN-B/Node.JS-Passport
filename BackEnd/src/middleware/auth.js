"use strict";
/* 접근 권한 제어 미들웨어*/

// 로그인 중이면 req.isAuthenticated()가 true, 그렇지 않으면 false > 로그인 여부 판단
// 로그인하지 않은 사용자는 로그아웃 라우터에 접근 불가
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(403).json({
            message: "You are not logged in.",
            code: 403,
        });
    }
};

// 로그인한 사용자는 회원가입과 로그인 라우터에 접근 불가
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        return res.status(403).json({
            message: "You are already logged in.",
            code: 403,
        });
    }
};
