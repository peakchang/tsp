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

    res.json({ message: 'yog 추가 성공' })

})

yogRouter.use('/get_yog_list', async (req, res, next) => {
    console.log(req.query);
    let addSql;
    if (req.query.chk_tong && req.query.chk_type) {
        addSql = `WHERE py_tong = '${req.query.chk_tong}' AND py_type = '${req.query.chk_type}'`;
    } else if (req.query.chk_tong && !req.query.chk_type) {
        addSql = `WHERE py_tong = '${req.query.chk_tong}'`;
    } else if (!req.query.chk_tong && req.query.chk_type) {
        addSql = `WHERE py_type = '${req.query.chk_type}'`;
    } else {
        addSql = '';
    }

    const getYogListSql = `SELECT * FROM ph_yog ${addSql} ORDER BY py_seq`;
    const getYogList = await sql_con.promise().query(getYogListSql);
    const get_yog_list = getYogList[0];
    console.log(get_yog_list);
    res.json({ get_yog_list })
})


yogRouter.post('/del_yog', async (req, res, next) => {
    try {
        const pyNumList = req.body.py_num
        for await (const delNum of req.body.yogChecked) {
            const delYogSql = "DELETE FROM ph_yog WHERE py_num = ?";
            await sql_con.promise().query(delYogSql, [pyNumList[delNum]]);
        }
        return res.json({ message: 'yog 삭제 성공' })
    } catch (error) {
        return res.json({ message: 'fail' })
    }



})
yogRouter.post('/update_yog', async (req, res, next) => {

    try {
        const pyNum = req.body.py_num;
        const pyName = req.body.py_name;
        const pyTong = req.body.py_tong;
        const pyCall = req.body.py_call;
        const pyData = req.body.py_data;
        const pyFee = req.body.py_fee;
        const pySms = req.body.py_sms;
        const pySeq = req.body.py_seq;
        const pyAddinfo = req.body.py_addinfo;
        const pyType = req.body.py_type;


        for await (const updateNum of req.body.yogChecked) {
            console.log(updateNum);
            console.log(pyName[updateNum]);
            console.log(pyFee[updateNum]);
            const updateYogSql = "UPDATE ph_yog SET py_name =?, py_tong =?, py_call =?, py_fee =?, py_sms =?, py_data=?, py_seq =?, py_addinfo =?, py_type =? WHERE py_num =?";
            await sql_con.promise().query(updateYogSql, [pyName[updateNum], pyTong[updateNum], pyCall[updateNum], pyFee[updateNum], pySms[updateNum], pyData[updateNum], pySeq[updateNum], pyAddinfo[updateNum], pyType[updateNum], pyNum[updateNum]]);
        }
        return res.json({ message: 'yog 업데이트 성공' })
    } catch (error) {
        console.log(error);
        return res.json({ result: 'fail', message: 'yog 업데이트 실패' })
    }


})


yogRouter.post('/upload_excel', async (req, res, next) => {
    console.log(req.body);
    for await (const yogInfo of req.body) {
        console.log(yogInfo);
        const exPyChkSql = "SELECT * FROM ph_yog WHERE py_name =?";
        const exPyChk = await sql_con.promise().query(exPyChkSql, [yogInfo.py_name]);
        if (exPyChk[0][0]) {
            const exPyUpdateSql = "UPDATE ph_yog SET py_name =?, py_tong =?, py_call =?, py_fee =?, py_sms =?, py_data=?, py_type =?, py_seq=?,py_addinfo=? WHERE py_name =?";
            await sql_con.promise().query(exPyUpdateSql, [yogInfo.py_name, yogInfo.py_tong, yogInfo.py_call, yogInfo.py_fee, yogInfo.py_sms, yogInfo.py_data, yogInfo.py_type, yogInfo.py_seq, yogInfo.py_addinfo, yogInfo.py_name]);
        } else {
            const exPyInsertSql = "INSERT INTO ph_yog (py_name, py_tong, py_call, py_fee, py_sms, py_data, py_type, py_seq,py_addinfo) VALUES (?,?,?,?,?,?,?,?,?)";
            await sql_con.promise().query(exPyInsertSql, [yogInfo.py_name, yogInfo.py_tong, yogInfo.py_call, yogInfo.py_fee, yogInfo.py_sms, yogInfo.py_data, yogInfo.py_type, yogInfo.py_seq, yogInfo.py_addinfo]);
        }
    }
})


export { yogRouter }