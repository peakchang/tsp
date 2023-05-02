import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const getItemRouter = express.Router();


getItemRouter.use('/', async (req, res, next) => {
    console.log(req.query);

    const getItemInfoSql = `SELECT * FROM ph_item WHERE it_id = ?`;
    const getItemInfo = await sql_con.promise().query(getItemInfoSql, [req.query.it_id]);
    const get_item_info = getItemInfo[0][0];

    const getItemGongsiSql = `SELECT * FROM ph_gongsi WHERE gj_model_name = ?`;
    const getItemGongsi = await sql_con.promise().query(getItemGongsiSql, [get_item_info.it_gongsi_model]);
    const get_item_gongsi = getItemGongsi[0][0];

    const getYogSql = "SELECT * FROM ph_yog WHERE py_type = ?"
    const getYog = await sql_con.promise().query(getYogSql, [get_item_info.it_cotype]);
    const get_yog = getYog[0]

    console.log('여기까지 에러 체크!');



    console.log('시작하즈아~~~~~~~~~~~~');
    // console.log(req.query);
    res.json({ get_item_info, get_item_gongsi, get_yog })
})

export { getItemRouter }
