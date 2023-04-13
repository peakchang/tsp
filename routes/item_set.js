import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const itemRouter = express.Router();

itemRouter.use('/get_sel_yog', async (req, res, next) => {
    const setYogListSql = `SELECT * FROM ph_yog WHERE py_tong = ?`;
    const setYogList = await sql_con.promise().query(setYogListSql, [req.query.set_yog]);
    const set_yog_list = setYogList[0];
    res.json({ set_yog_list });
})

itemRouter.use('/item_update_div', async (req, res, next) => {
    console.log(req.body);
    const chkItemSql = `SELECT * FROM ph_item WHERE item_id =?`;
    const chkItem = await sql_con.promise().query(chkItemSql, [req.body.item_id]);
    const chk_item = chkItem[0][0];
    if(chk_item){
        const itemUpdateSql = `UPDATE ph_item SET item_name =?, item_price =?, item_`
    }
})

export { itemRouter }