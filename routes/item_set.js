import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const itemRouter = express.Router();


itemRouter.use('/get_item_list', async (req, res, next) => {
    console.log('alsjdfliajsdlfj');
    const itemListSql = "SELECT it_use,it_id,it_subname,it_price,it_seq,it_ph_tongsin FROM ph_item";
    const itemList = await sql_con.promise().query(itemListSql);
    const item_list = itemList[0];
    console.log(item_list);
    res.json({ item_list });
})

itemRouter.use('/get_product_info', async (req, res, next) => {
    console.log(req.query);
    console.log('lakjkfjasdklfj1111111111111');
    const getProductSql = `SELECT * FROM ph_item WHERE it_id =?`;
    const getProduct = await sql_con.promise().query(getProductSql, [req.query.it_id]);
    const get_product = getProduct[0][0];
    console.log(get_product);
    res.json({ get_product });
})




itemRouter.use('/get_sel_yog', async (req, res, next) => {
    const setYogListSql = `SELECT * FROM ph_yog WHERE py_tong = ?`;
    const setYogList = await sql_con.promise().query(setYogListSql, [req.query.set_yog]);
    const set_yog_list = setYogList[0];
    res.json({ set_yog_list });
})

itemRouter.use('/item_update_div', async (req, res, next) => {
    // console.log(req.body);
    const ph = req.body;
    console.log(ph.it_img_list);
    const phi = req.body.allPhInfo;
    // console.log(phi);
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const chkItemSql = `SELECT * FROM ph_item WHERE it_id =?`;
    const chkItem = await sql_con.promise().query(chkItemSql, [req.body.item_id]);
    const chk_item = chkItem[0][0];

    // console.log(phi.sk.it_ph_fprice);
    if (chk_item) {
        const itemUpdateSql = `UPDATE ph_item SET it_name =?, it_subname =?, it_cotype =?,it_dependitem =?,it_mainitem =?,it_maker =?,it_brand =?,it_model =?,it_explan =?,it_price =?,it_use =?,it_jisho_status =?,it_sunhal_use =?,it_nohalin =?,it_jisho_cate =?,it_color =?,it_colorcode =?,it_img_list=?,it_mainstan =?,it_gongsi_model =?,it_relation_item =?,it_ph_tongsin =?,it_ph_sk_fprice =?,it_ph_sk_capa =?,it_ph_sk_newdisc =?,it_ph_sk_mnpgdisc =?,it_ph_sk_mnpsdisc =?,it_ph_sk_gibgdisc =?,it_ph_sk_gibsdisc =?,it_ph_kt_fprice =?,it_ph_kt_capa =?,it_ph_kt_newdisc =?,it_ph_kt_mnpgdisc =?,it_ph_kt_mnpsdisc =?,it_ph_kt_gibgdisc =?,it_ph_kt_gibsdisc =?,it_ph_lg_fprice =?,it_ph_lg_capa =?,it_ph_lg_newdisc =?,it_ph_lg_mnpgdisc =?,it_ph_lg_mnpsdisc =?,it_ph_lg_gibgdisc =?,it_ph_lg_gibsdisc =?, it_seq = ?,it_update_time =? WHERE it_id =?`;
        const itemUpdateArr = [ph.it_name, ph.it_subname, ph.it_cotype, ph.it_dependitem, ph.it_mainitem, ph.it_maker, ph.it_brand, ph.it_model, ph.it_explan, ph.it_price, ph.it_use, ph.it_jisho_status, ph.it_sunhal_use, ph.it_nohalin, ph.it_jisho_cate, ph.it_color, ph.it_colorcode,ph.it_img_list, ph.it_mainstan, ph.it_gongsi_model, ph.it_relation_item, ph.it_ph_tongsin, phi.sk.it_ph_fprice, phi.sk.it_ph_capa, phi.sk.it_ph_newdisc, phi.sk.it_ph_mnpgdisc, phi.sk.it_ph_mnpsdisc, phi.sk.it_ph_gibgdisc, phi.sk.it_ph_gibsdisc, phi.kt.it_ph_fprice, phi.kt.it_ph_capa, phi.kt.it_ph_newdisc, phi.kt.it_ph_mnpgdisc, phi.kt.it_ph_mnpsdisc, phi.kt.it_ph_gibgdisc, phi.kt.it_ph_gibsdisc, phi.lg.it_ph_fprice, phi.lg.it_ph_capa, phi.lg.it_ph_newdisc, phi.lg.it_ph_mnpgdisc, phi.lg.it_ph_mnpsdisc, phi.lg.it_ph_gibgdisc, phi.lg.it_ph_gibsdisc, ph.it_seq, now, ph.item_id]

        await sql_con.promise().query(itemUpdateSql, itemUpdateArr);
    } else {
        const itemInsertSql = `INSERT INTO ph_item (
            it_id,
            it_name,
            it_subname,
            it_cotype,
            it_dependitem,
            it_mainitem,
            it_maker,
            it_brand,
            it_model,
            it_explan,
            it_price,
            it_use,
            it_jisho_status,
            it_sunhal_use,
            it_nohalin,
            it_jisho_cate,
            it_color,
            it_colorcode,
            it_mainstan,
            it_gongsi_model,
            it_img_list,
            it_relation_item,
            it_ph_tongsin,
            it_ph_sk_fprice,
            it_ph_sk_capa,
            it_ph_sk_newdisc,
            it_ph_sk_mnpgdisc,
            it_ph_sk_mnpsdisc,
            it_ph_sk_gibgdisc,
            it_ph_sk_gibsdisc,
            it_ph_kt_fprice,
            it_ph_kt_capa,
            it_ph_kt_newdisc,
            it_ph_kt_mnpgdisc,
            it_ph_kt_mnpsdisc,
            it_ph_kt_gibgdisc,
            it_ph_kt_gibsdisc,
            it_ph_lg_fprice,
            it_ph_lg_capa,
            it_ph_lg_newdisc,
            it_ph_lg_mnpgdisc,
            it_ph_lg_mnpsdisc,
            it_ph_lg_gibgdisc,
            it_ph_lg_gibsdisc,
            it_seq,
            it_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const itemInsertArr = [
            ph.item_id, ph.it_name, ph.it_subname, ph.it_cotype, ph.it_dependitem, ph.it_mainitem, ph.it_maker, ph.it_brand, ph.it_model, ph.it_explan,
            ph.it_price, ph.it_use, ph.it_jisho_status, ph.it_sunhal_use, ph.it_nohalin, ph.it_jisho_cate, ph.it_color, ph.it_colorcode,  ph.it_mainstan, ph.it_gongsi_model, ph.it_img_list,
            ph.it_relation_item, ph.it_ph_tongsin, phi.sk.it_ph_fprice, phi.sk.it_ph_capa, phi.sk.it_ph_newdisc, phi.sk.it_ph_mnpgdisc, phi.sk.it_ph_mnpsdisc, phi.sk.it_ph_gibgdisc, phi.sk.it_ph_gibsdisc, phi.kt.it_ph_fprice,
            phi.kt.it_ph_capa, phi.kt.it_ph_newdisc, phi.kt.it_ph_mnpgdisc, phi.kt.it_ph_mnpsdisc, phi.kt.it_ph_gibgdisc, phi.kt.it_ph_gibsdisc, phi.lg.it_ph_fprice, phi.lg.it_ph_capa, phi.lg.it_ph_newdisc, phi.lg.it_ph_mnpgdisc,
            phi.lg.it_ph_mnpsdisc, phi.lg.it_ph_gibgdisc, phi.lg.it_ph_gibsdisc, ph.it_seq, now]

        await sql_con.promise().query(itemInsertSql, itemInsertArr);
    }
})

export { itemRouter }
