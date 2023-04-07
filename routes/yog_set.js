import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const yogRouter = express.Router();

yogRouter.post('/add_yog', async (req, res, next) => {
    console.log('일로 와따!!!!');
    console.log(req.body);
    const addYogSql = "INSERT INTO ph_yog (py_name) VALUES ('ready yog!')";
    await sql_con.promise().query(addYogSql);


})

yogRouter.use('/get_yog_list', async (req, res, next) => {
    const getYogListSql = "SELECT * FROM ph_yog";
    const getYogList = await sql_con.promise().query(getYogListSql);
    const get_yog_list = getYogList[0];
    res.json({ get_yog_list })
})

export { yogRouter }