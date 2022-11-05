const config = require("config");

const { createLogger, transports, format } = require("winston");
const { combine, timestamp, simple, colorize, printf, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    //사용자지정포맷
    return `${timestamp} [${label}] ${level} : ${message}`; //www.js의 message
}); //마지막이 최종 출력포맷이됨

const printLogFormat = {
    file: combine(
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

    console: combine(colorize(), simple()),
};

const opts = {
    file: new transports.File({
        //log를 파일에저장
        filename: "access.log",
        dirname: "./logs",
        level: "info", //2레벨인데, 다른곳의 2,1,0레벨인 로그들 출력가능
        format: printLogFormat.file, //format이 file에 저장되기위한 형태
    }),

    console: new transports.Console({
        //log를 콘솔로찍음
        level: "info",
        format: printLogFormat.console, //format이 console에 찍히기위한 형태
    }),
};

const logger = createLogger({
    transports: [opts.file],
});

if (config.get("server.state") !== "production") {
    //실제 서비스중인 서버가 아니면
    logger.add(opts.console);
} //실제 서비스중인 서버와 개발중인 서버를 구분지을 수 있음

logger.stream = {
    write: (message) => logger.info(message),
}; //morgan과의 연결

module.exports = logger;
