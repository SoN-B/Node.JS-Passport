// 모듈 선언
var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const config = require("config");
var fs = require("fs");

//웹세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" }); // 응답 헤더에 대한 정보를 기록하는 메서드, 응답의 콘텐츠 형식이 HTML
        res.end(data); // 주로 서버가 작동을 안하거나 오류가 있을 경우, 특정 문구를 나타내고 응답을 종료하고자 할 때 사용
    });
});

//연결
app.listen(config.get("server.port"), () => {
    // 서버 연결
    console.log(`Server Running on ${config.get("server.port")} Port!`);
});
