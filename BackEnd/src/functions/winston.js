"use strict";

const config = require("config");

const winstonDaily = require("winston-daily-rotate-file");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, simple, colorize, printf, label } = format;

const logDir = "logs";

const printFormat = printf(({ timestamp, label, level, message }) => {
    //사용자지정포맷
    return `${timestamp} [${label}] ${level} : ${message}`; //www.js의 message
}); //마지막이 최종 출력포맷이됨

const printLogFormat = {
    default: combine(
        //추가해주고 싶은 포맷들을 결합
        //colorize(), //console에 찍히는 에러에 색상입힘
        //winston.format.simple(), //간단한 형식으로
        label({
            label: "RE_SPEC", //어떤프로젝트의 로그인지 알려줌
        }),

        timestamp({
            format: "YYYY-MM-DD HH:mm:dd",
        }),
        printFormat
    ),
};

const logger = createLogger({
    format: printLogFormat.default,
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: `%DATE%.log`, // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true,
        }),
        // warn 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: "warn",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/warn",
            filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if (config.get("server.state") !== "production") {
    //실제 서비스중인 서버가 아니면
    logger.add(
        new transports.Console({
            format: combine(
                colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
                printFormat // log format 적용
            ),
        })
    );
} //실제 서비스중인 서버와 개발중인 서버를 구분지을 수 있음

logger.stream = {
    write: (message) => logger.info(message),
}; //morgan과의 연결

module.exports = logger;
