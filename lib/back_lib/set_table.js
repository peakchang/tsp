import { sql_con } from "./set_db.js";

const tableSetting = async () => {
    console.log('테이블 셋팅 안하는거니~~~~~~~~~~~~~~');

    let ph_gongsi_table = `CREATE TABLE IF NOT EXISTS ph_gongsi(
        gj_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        gj_use VARCHAR(5) DEFAULT '1',
        gj_model_name VARCHAR(50),
        gj_sk VARCHAR(150),
        gj_kt VARCHAR(150),
        gj_lg VARCHAR(150),
        gj_seq VARCHAR(10)
    );`;
    try {
        sql_con.query(ph_gongsi_table);
    } catch (err) {
        console.error(err);
    }


    let ph_order_table = `CREATE TABLE IF NOT EXISTS ph_order(
        po_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        po_it_id VARCHAR(50),
        po_type VARCHAR(10),
        po_mb_email VARCHAR(50),
        po_name VARCHAR(50),
        po_device VARCHAR(100),
        po_tong VARCHAR(10),
        pre_tong VARCHAR(10),
        po_num1 VARCHAR(10),
        po_num2 VARCHAR(10),
        po_num3 VARCHAR(10),
        po_subnum1 VARCHAR(10),
        po_subnum2 VARCHAR(10),
        po_subnum3 VARCHAR(10),
        po_cardname VARCHAR(50),
        po_cardprice VARCHAR(50),
        po_onfam VARCHAR(10),
        po_color VARCHAR(10),
        po_bitrh VARCHAR(50),
        po_email VARCHAR(50),
        po_halbu_num VARCHAR(10),
        po_hyuh VARCHAR(10),
        po_usim VARCHAR(10),
        po_halwon VARCHAR(50),
        po_yog VARCHAR(50),
        po_zip1 VARCHAR(100),
        po_addr1 VARCHAR(100),
        po_addr2 VARCHAR(100),
        po_addr3 VARCHAR(100),
        po_pacompany VARCHAR(20),
        po_songjang VARCHAR(100),
        po_memo VARCHAR(255),
        po_status VARCHAR(20),
        po_pwd VARCHAR(100),
        po_time DATETIME
    );`;
    try {
        sql_con.query(ph_order_table);
    } catch (err) {
        console.error(err);
    }


    let ph_review_table = `CREATE TABLE IF NOT EXISTS ph_review(
        rv_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        rv_it_id VARCHAR(50),
        rv_mb_email VARCHAR(50),
        rv_name VARCHAR(50),
        rv_pwd VARCHAR(100),
        rv_subject VARCHAR(255),
        rv_content TEXT,
        rv_time DATETIME,
        rv_ip VARCHAR(50),
        rv_reply VARCHAR(255),
        rv_reply_nick VARCHAR(50)
    );`;
    try {
        sql_con.query(ph_review_table);
    } catch (err) {
        console.error(err);
    }

    let ph_item_table = `CREATE TABLE IF NOT EXISTS ph_item(
        it_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        it_id VARCHAR(50),
        it_skin VARCHAR(10),
        it_name VARCHAR(50),
        it_subname VARCHAR(50),
        it_cotype VARCHAR(10),
        it_dependitem VARCHAR(255),
        it_mainitem INT(5),
        it_maker VARCHAR(50),
        it_brand VARCHAR(50),
        it_model VARCHAR(50),
        it_explan TEXT,
        it_explan_all INT(5),
        it_price VARCHAR(50),
        it_use INT(5),
        it_jisho_status INT(5),
        it_sunhal_use INT(5),
        it_nohalin INT(5),
        it_hignend_chk INT(5),
        it_hit VARCHAR(50),
        it_jisho_cate VARCHAR(50),
        it_color VARCHAR(255),
        it_colorcode VARCHAR(255),
        it_img_list TEXT,
        it_mainstan VARCHAR(255),
        it_gongsi_model VARCHAR(50),
        it_relation_item VARCHAR(255),
        it_ph_tongsin VARCHAR(150),
        it_ph_fprice_sk VARCHAR(150),
        it_ph_capa_sk VARCHAR(150),
        it_ph_newdisc_sk VARCHAR(150),
        it_ph_mnpgdisc_sk VARCHAR(150),
        it_ph_mnpsdisc_sk VARCHAR(150),
        it_ph_gibgdisc_sk VARCHAR(150),
        it_ph_gibsdisc_sk VARCHAR(150),
        it_ph_fprice_kt VARCHAR(150),
        it_ph_capa_kt VARCHAR(150),
        it_ph_newdisc_kt VARCHAR(150),
        it_ph_mnpgdisc_kt VARCHAR(150),
        it_ph_mnpsdisc_kt VARCHAR(150),
        it_ph_gibgdisc_kt VARCHAR(150),
        it_ph_gibsdisc_kt VARCHAR(150),
        it_ph_fprice_lg VARCHAR(150),
        it_ph_capa_lg VARCHAR(150),
        it_ph_newdisc_lg VARCHAR(150),
        it_ph_mnpgdisc_lg VARCHAR(150),
        it_ph_mnpsdisc_lg VARCHAR(150),
        it_ph_gibgdisc_lg VARCHAR(150),
        it_ph_gibsdisc_lg VARCHAR(150),
        it_seq VARCHAR(5),
        it_time DATETIME,
        it_update_time DATETIME
    );`;
    try {
        sql_con.query(ph_item_table);
    } catch (err) {
        console.error(err);
    }

    let ph_qa_table = `CREATE TABLE IF NOT EXISTS ph_qa(
        qa_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        qa_it_id VARCHAR(100),
        qa_email VARCHAR(100),
        qa_secret INT(5),
        qa_name VARCHAR(100),
        qa_pwd VARCHAR(100),
        qa_phone VARCHAR(100),
        qa_subject VARCHAR(100),
        qa_question TEXT,
        qa_answer TEXT,
        qa_question_time DATETIME,
        qa_answer_time DATETIME,
        qa_ip VARCHAR(100)
    );`;
    try {
        sql_con.query(ph_qa_table);
    } catch (err) {
        console.error(err);
    }

    let ph_yog_table = `CREATE TABLE IF NOT EXISTS ph_yog(
        py_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        py_active INT(10) DEFAULT 1,
        py_tong VARCHAR(50),
        py_name VARCHAR(100),
        py_call VARCHAR(50),
        py_sms VARCHAR(50),
        py_data VARCHAR(50),
        py_addinfo VARCHAR(255),
        py_fee INT(100),
        py_seq INT(10),
        py_type VARCHAR(50)
    );`;
    try {
        sql_con.query(ph_yog_table);
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
        site_manager VARCHAR(10),
        site_order_statue VARCHAR(255)
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
        user_provider VARCHAR(10),
        user_rate int(5) DEFAULT 1,
        user_thumbnail VARCHAR(255),
        user_retoken VARCHAR(255),
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