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

export { itemRouter }