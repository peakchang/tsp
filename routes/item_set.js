import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from "../lib/back_lib/set_db.js";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares.js"
import request from "async-request";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const itemRouter = express.Router();


// 상품 리스트 불러오기
itemRouter.use('/get_item_list', async (req, res, next) => {
    const itemListSql = "SELECT it_use,it_id,it_subname,it_price,it_seq,it_ph_tongsin,it_mainstan,it_img_list FROM ph_item";
    const itemList = await sql_con.promise().query(itemListSql);
    const item_list = itemList[0];
    res.json({ item_list });
})


// 상품 상세 불러오기
itemRouter.use('/get_product_info', async (req, res, next) => {
    const getProductSql = `SELECT * FROM ph_item WHERE it_id =?`;
    const getProduct = await sql_con.promise().query(getProductSql, [req.query.it_id]);
    const get_product = getProduct[0][0];

    const getAllDevicesSql = "SELECT it_id, it_subname FROM ph_item WHERE NOT it_id IN (?)";
    const getAllDevices = await sql_con.promise().query(getAllDevicesSql, [req.query.it_id]);
    const get_all_devices = getAllDevices[0];
    res.json({ get_product, get_all_devices });
})


// 선택된 요금제 불러오기
itemRouter.use('/get_sel_yog', async (req, res, next) => {
    const setYogListSql = `SELECT * FROM ph_yog WHERE py_tong = ?`;
    const setYogList = await sql_con.promise().query(setYogListSql, [req.query.set_yog]);
    const set_yog_list = setYogList[0];
    res.json({ set_yog_list });
})


// 개별 상품 업로드
itemRouter.use('/item_update_div', async (req, res, next) => {
    console.log('상품 업로드!!!');

    // console.log(req.body);

    const chkItemSql = `SELECT * FROM ph_item WHERE it_id = ?`
    const chkItem = await sql_con.promise().query(chkItemSql, [req.body.it_id]);
    const chk_item = chkItem[0][0];


    const itObj = req.body;
    let updateKeyStr = '';
    let qmStr = '';
    let updateArr = [];
    let itemUpSql;
    for (const key in itObj) {

        if (chk_item) {
            if (key != 'allPhInfo' && key != 'it_id') {
                // console.log(key);
                updateKeyStr = updateKeyStr + key + '=?,';
                updateArr.push(itObj[key])
            }
        } else {
            if (key != 'allPhInfo') {
                // console.log(key);
                updateKeyStr = updateKeyStr + key + ',';
                qmStr = qmStr + '?,'
                updateArr.push(itObj[key])
            }
        }



        if (key == 'allPhInfo') {
            console.log('------------');
            const allTongObj = itObj[key];
            Object.keys(allTongObj).find((key1) => {
                const tongObj = allTongObj[key1];
                // console.log(key1);
                // console.log(tongObj);
                for (const tKey in tongObj) {
                    console.log(tKey);


                    if (chk_item) {
                        updateKeyStr = updateKeyStr + tKey + '_' + key1 + '=?,';
                    } else {
                        updateKeyStr = updateKeyStr + tKey + '_' + key1 + ',';
                        qmStr = qmStr + '?,'
                    }
                    updateArr.push(tongObj[tKey])

                }
            })
        }
    }

    // console.log(updateKeyStr);
    console.log(updateArr);
    updateKeyStr = updateKeyStr.replace(/,$/, '');
    qmStr = qmStr ? qmStr.replace(/,$/, '') : '';


    if (chk_item) {
        itemUpSql = `UPDATE ph_item SET ${updateKeyStr} WHERE it_id = ${itObj['it_id']}`
        // 
    } else {
        itemUpSql = `INSERT INTO ph_item (${updateKeyStr}) VALUES (${qmStr})`
    }
    console.log(itemUpSql);
    await sql_con.promise().query(itemUpSql, updateArr);




    // const ph = req.body;
    // const phi = req.body.allPhInfo;
    // const now = moment().format('YYYY-MM-DD HH:mm:ss')
    // const chkItemSql = `SELECT * FROM ph_item WHERE it_id =?`;
    // const chkItem = await sql_con.promise().query(chkItemSql, [req.body.item_id]);
    // const chk_item = chkItem[0][0];

    // if (chk_item) {
    //     const itemUpdateSql = `UPDATE ph_item SET it_name =?, it_subname =?, it_cotype =?,it_dependitem =?,it_mainitem =?,it_maker =?,it_brand =?,it_model =?,it_explan =?,it_price =?,it_use =?,it_jisho_status =?,it_sunhal_use =?,it_nohalin =?,it_jisho_cate =?,it_color =?,it_colorcode =?,it_img_list=?,it_mainstan =?,it_gongsi_model =?,it_relation_item =?,it_ph_tongsin =?,it_ph_sk_fprice =?,it_ph_sk_capa =?,it_ph_sk_newdisc =?,it_ph_sk_mnpgdisc =?,it_ph_sk_mnpsdisc =?,it_ph_sk_gibgdisc =?,it_ph_sk_gibsdisc =?,it_ph_kt_fprice =?,it_ph_kt_capa =?,it_ph_kt_newdisc =?,it_ph_kt_mnpgdisc =?,it_ph_kt_mnpsdisc =?,it_ph_kt_gibgdisc =?,it_ph_kt_gibsdisc =?,it_ph_lg_fprice =?,it_ph_lg_capa =?,it_ph_lg_newdisc =?,it_ph_lg_mnpgdisc =?,it_ph_lg_mnpsdisc =?,it_ph_lg_gibgdisc =?,it_ph_lg_gibsdisc =?, it_seq = ?,it_update_time =? WHERE it_id =?`;
    //     const itemUpdateArr = [ph.it_name, ph.it_subname, ph.it_cotype, ph.it_dependitem, ph.it_mainitem, ph.it_maker, ph.it_brand, ph.it_model, ph.it_explan, ph.it_price, ph.it_use, ph.it_jisho_status, ph.it_sunhal_use, ph.it_nohalin, ph.it_jisho_cate, ph.it_color, ph.it_colorcode, ph.it_img_list, ph.it_mainstan, ph.it_gongsi_model, ph.it_relation_item, ph.it_ph_tongsin, phi.sk.it_ph_fprice, phi.sk.it_ph_capa, phi.sk.it_ph_newdisc, phi.sk.it_ph_mnpgdisc, phi.sk.it_ph_mnpsdisc, phi.sk.it_ph_gibgdisc, phi.sk.it_ph_gibsdisc, phi.kt.it_ph_fprice, phi.kt.it_ph_capa, phi.kt.it_ph_newdisc, phi.kt.it_ph_mnpgdisc, phi.kt.it_ph_mnpsdisc, phi.kt.it_ph_gibgdisc, phi.kt.it_ph_gibsdisc, phi.lg.it_ph_fprice, phi.lg.it_ph_capa, phi.lg.it_ph_newdisc, phi.lg.it_ph_mnpgdisc, phi.lg.it_ph_mnpsdisc, phi.lg.it_ph_gibgdisc, phi.lg.it_ph_gibsdisc, ph.it_seq, now, ph.item_id]

    //     await sql_con.promise().query(itemUpdateSql, itemUpdateArr);
    // } else {
    //     const itemInsertSql = `INSERT INTO ph_item (
    //         it_id,
    //         it_name,
    //         it_subname,
    //         it_cotype,
    //         it_dependitem,
    //         it_mainitem,
    //         it_maker,
    //         it_brand,
    //         it_model,
    //         it_explan,
    //         it_price,
    //         it_use,
    //         it_jisho_status,
    //         it_sunhal_use,
    //         it_nohalin,
    //         it_jisho_cate,
    //         it_color,
    //         it_colorcode,
    //         it_mainstan,
    //         it_gongsi_model,
    //         it_img_list,
    //         it_relation_item,
    //         it_ph_tongsin,
    //         it_ph_sk_fprice,
    //         it_ph_sk_capa,
    //         it_ph_sk_newdisc,
    //         it_ph_sk_mnpgdisc,
    //         it_ph_sk_mnpsdisc,
    //         it_ph_sk_gibgdisc,
    //         it_ph_sk_gibsdisc,
    //         it_ph_kt_fprice,
    //         it_ph_kt_capa,
    //         it_ph_kt_newdisc,
    //         it_ph_kt_mnpgdisc,
    //         it_ph_kt_mnpsdisc,
    //         it_ph_kt_gibgdisc,
    //         it_ph_kt_gibsdisc,
    //         it_ph_lg_fprice,
    //         it_ph_lg_capa,
    //         it_ph_lg_newdisc,
    //         it_ph_lg_mnpgdisc,
    //         it_ph_lg_mnpsdisc,
    //         it_ph_lg_gibgdisc,
    //         it_ph_lg_gibsdisc,
    //         it_seq,
    //         it_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    //     const itemInsertArr = [
    //         ph.item_id, ph.it_name, ph.it_subname, ph.it_cotype, ph.it_dependitem, ph.it_mainitem, ph.it_maker, ph.it_brand, ph.it_model, ph.it_explan,
    //         ph.it_price, ph.it_use, ph.it_jisho_status, ph.it_sunhal_use, ph.it_nohalin, ph.it_jisho_cate, ph.it_color, ph.it_colorcode, ph.it_mainstan, ph.it_gongsi_model, ph.it_img_list,
    //         ph.it_relation_item, ph.it_ph_tongsin, phi.sk.it_ph_fprice, phi.sk.it_ph_capa, phi.sk.it_ph_newdisc, phi.sk.it_ph_mnpgdisc, phi.sk.it_ph_mnpsdisc, phi.sk.it_ph_gibgdisc, phi.sk.it_ph_gibsdisc, phi.kt.it_ph_fprice,
    //         phi.kt.it_ph_capa, phi.kt.it_ph_newdisc, phi.kt.it_ph_mnpgdisc, phi.kt.it_ph_mnpsdisc, phi.kt.it_ph_gibgdisc, phi.kt.it_ph_gibsdisc, phi.lg.it_ph_fprice, phi.lg.it_ph_capa, phi.lg.it_ph_newdisc, phi.lg.it_ph_mnpgdisc,
    //         phi.lg.it_ph_mnpsdisc, phi.lg.it_ph_gibgdisc, phi.lg.it_ph_gibsdisc, ph.it_seq, now]

    //     await sql_con.promise().query(itemInsertSql, itemInsertArr);
    // }
})


// 엑셀 상품 업로드
itemRouter.use('/item_update_excel', async (req, res, next) => {
    try {
        for await (const exVal of req.body) {
            console.log(exVal);
            if (exVal.it_id) {
                console.log('업데이트~~~');
                let upKeyVal = ""
                let valList = [];
                for (const key in exVal) {
                    if (key == 'it_id') {
                        console.log('여기는 들어오는거지??');
                        continue
                    } else {
                        upKeyVal = `${upKeyVal} ${key} = ?,`
                    }
                    valList.push(exVal[key]);
                }
                upKeyVal = upKeyVal.replace(/,$/, '');
                const updateSql = `UPDATE ph_item SET ${upKeyVal} WHERE it_id = ${exVal.it_id}`;
                await sql_con.promise().query(updateSql, valList);

            } else {
                console.log('인서트~~~');
                const timestamp = String(new Date().getTime());
                console.log(timestamp);
                let keyName = "it_id,";
                let qmStr = '?,';
                let valList = [timestamp];
                for (const key in exVal) {
                    if (keyName) {
                        keyName = keyName + key + ',';
                        qmStr = qmStr + '?' + ','
                    } else {
                        keyName = key + ',';
                        qmStr = '?' + ','
                    }
                    valList.push(exVal[key]);
                }

                if (keyName.includes('it_mainstan')) {
                    keyName = keyName.replace(/,$/, '');
                    qmStr = qmStr.replace(/,$/, '');
                } else {
                    keyName = keyName + 'it_mainstan';
                    qmStr = qmStr + '?'
                    valList.push('sk,0,0,0');
                }
                const insertSql = `INSERT INTO ph_item (${keyName}) VALUES (${qmStr})`
                await sql_con.promise().query(insertSql, valList);
            }
        }
        res.json({ message: 'success!!' })
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message })
    }
})


itemRouter.use('/item_update_list', async (req, res, next) => {
    console.log(req.body.chkList);
    console.log(req.body.itIdList);
    console.log(req.body.type);
    const idList = req.body.itIdList;
    if(req.body.type == 'item_delete'){
        for (const chkVal of req.body.chkList) {
            const deleteSql = `DELETE FROM ph_item WHERE it_id = ?`
            await sql_con.promise().query(deleteSql, [idList[chkVal]]);
        }
    }
})

export { itemRouter }
