"use strict";

const Sequelize = require("sequelize");

module.exports = class Jobcategory extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                // 테이블 필드에 대한 설정
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true, // 중복 X
                    primaryKey: true,
                },
                category: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
            },
            {
                // 테이블 자체에 대한 설정
                sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
                timestamps: true /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
                modelName: "Jobcategory" /* 모델 이름을 설정. */,
                tableName: "job_category" /* 데이터베이스의 테이블 이름. */,
                charset: "utf8" /* 인코딩 */,
                collate: "utf8_general_ci",
            }
        );
    }

    // 다른 모델과의 관계
    static associate(db) {
        db.Jobcategory.hasMany(db.Job, { foreignKey: "categorykey", sourceKey: "id", onDelete: "cascade", onUpdate: "cascade" });
    }
};
