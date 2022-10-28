"use strict";

const Sequelize = require("sequelize");
const config = require("config");

const User = require("../models/user");
const Jobcategory = require("../models/job_category");
const Job = require("../models/job");

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.get("mysql_local.database"), config.get("mysql_local.username"), config.get("mysql_local.password"), {
    host: config.get("mysql_local.host"),
    dialect: config.get("mysql_local.dialect"),
});

const db = {};

db.sequelize = sequelize;

db.User = User;
db.Jobcategory = Jobcategory;
db.Job = Job;

User.init(sequelize);
Jobcategory.init(sequelize);
Job.init(sequelize);

User.associate(db);
Jobcategory.associate(db);
Job.associate(db);

module.exports = db;
