import { sql_con } from "./set_db.js";

const tableSetting = async () => {
    console.log('테이블 셋팅 안하는거니~~~~~~~~~~~~~~');

    let testBoardTable = `CREATE TABLE IF NOT EXISTS test_board(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        tb_subject VARCHAR(255),
        tb_content TEXT,
        tb_userid VARCHAR(10),
        tb_created_at DATETIME,
        tb_update_at DATETIME
    );`;
    try {
        sql_con.query(testBoardTable);
    } catch (err) {
        console.error(err);
    }

    let siteSetTable = `CREATE TABLE IF NOT EXISTS site_setting(
        site_set VARCHAR(10),
        site_company VARCHAR(50),
        site_company_num VARCHAR(20),
        site_owner VARCHAR(10),
        site_address VARCHAR(255),
        site_tel VARCHAR(20),
        site_manager VARCHAR(10)
    );`;
    try {
        sql_con.query(siteSetTable);
    } catch (err) {
        console.error(err);
    }


    let makeUsersTable = `CREATE TABLE IF NOT EXISTS users(
        idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_email varchar(100) UNIQUE,
        user_pwd varchar(100) ,
        user_name VARCHAR(20),
        user_nick VARCHAR(20),
        user_snsid VARCHAR(100),
        user_provider  VARCHAR(10),
        user_rate int(5) DEFAULT 1,
        user_thumbnail VARCHAR(255),
        user_created_at DATETIME,
        user_updated_at DATETIME,
        user_deleted_at DATETIME
    );`;
    try {
        sql_con.query(makeUsersTable);
    } catch (err) {
        console.error(err);
    }
};

export { tableSetting }