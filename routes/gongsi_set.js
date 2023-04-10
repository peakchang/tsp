import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const gongsiRouter = express.Router();

gongsiRouter.use('/get_gongsi_list', async (req, res, next) => {
    const getGongsiSql = `SELECT * FROM ph_gongsi`;
    const getGongsiList = await sql_con.promise().query(getGongsiSql);
    const get_gongsi_list = getGongsiList[0];
    res.json({ get_gongsi_list });
})

gongsiRouter.post('/add_gongsi', async (req, res, next) => {
    console.log('들어옴!!');
    const addGongsiSql = `INSERT INTO ph_gongsi (gj_model_name, gj_use) VALUES ('ready!!', '1')`;
    console.log(addGongsiSql);
    await sql_con.promise().query(addGongsiSql);

    res.json({ message: 'success!' });
})

gongsiRouter.post('/update_gongsi', async (req, res, next) => {
    console.log('들어옴!!');
    console.log(req.body);
    const chkArr = req.body.gj_checked;
    for await (const chk of chkArr) {
        const updateGongsiSql = `UPDATE ph_gongsi SET gj_use=?, gj_model_name=?, gj_sk=?, gj_kt=?, gj_lg=?, gj_seq=? WHERE gj_num=?`;
        const updateGongsiArr = [req.body.gj_use[chk], req.body.gj_model_name[chk], req.body.gj_sk[chk], req.body.gj_kt[chk], req.body.gj_lg[chk], req.body.gj_seq[chk], req.body.gj_num[chk]]
        await sql_con.promise().query(updateGongsiSql, updateGongsiArr);
    }

    res.json({ message: 'success!' });
})

gongsiRouter.post('/delete_gongsi', async (req, res, next) => {
    console.log(req.body);
    for await (const chk of req.body.gj_checked) {
        const deleteGongsiSql = `DELETE FROM ph_gongsi WHERE gj_num=?`;
        const deleteGongsiArr = [req.body.gj_num[chk]]
        await sql_con.promise().query(deleteGongsiSql, deleteGongsiArr);
    }
    res.json({ message: 'success!' });
})


gongsiRouter.post('/ex_update_gongsi', async (req, res, next) => {
    console.log(req.body.excelVal);
    for await (const exVal of req.body.excelVal) { 
        console.log(exVal);
        const chkGongsiSql = `SELECT * FROM ph_gongsi WHERE gj_model_name=?`;
        const getChkGongsi = await sql_con.promise().query(chkGongsiSql, [exVal.model_name]);
        const get_chk_gongsi = getChkGongsi[0][0];
        console.log(get_chk_gongsi);
        if(get_chk_gongsi){
            const updateGongsiSql = `UPDATE ph_gongsi SET gj_sk=?, gj_kt=?, gj_lg=? WHERE gj_model_name=?`;
            const updateGongsiArr = [exVal.sk_gongsi, exVal.kt_gongsi, exVal.lg_gongsi, exVal.gj_model_name]
            await sql_con.promise().query(updateGongsiSql, updateGongsiArr);
        }else{
            const addGongsiSql = `INSERT INTO ph_gongsi (gj_model_name, gj_sk, gj_kt, gj_lg) VALUES (?,?,?,?)`;
            const addGongsiArr = [exVal.model_name, exVal.sk_gongsi, exVal.kt_gongsi, exVal.lg_gongsi]
            await sql_con.promise().query(addGongsiSql, addGongsiArr);
        }
    }

    res.json({ message:'success!' });
})



export { gongsiRouter }