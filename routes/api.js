import express from "express";
import { sql_con } from "../lib/back_lib/set_db.js";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
import http from "http";

const apiRouter = express.Router();

apiRouter.use('/testiii', async (req, res, next) => {
    console.log(req.url);
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    var fullUrl = req.protocol + '://' + req.get('host') + '/editor_img';
    console.log(fullUrl);

    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    const date = new Date()
    console.log(date);
    res.json({ test: 'onPageGogogogo', test2: '문제는 JWT?? PASSPORT?? 여튼 로그인!!' })
})

apiRouter.use('/get_form', async (req, res, next) => {
    if (req.method == 'POST') {
        console.log(req.body);
        const insertFormSql = "INSERT INTO form_table (form_name, form_company, form_phone, form_budget, form_path, form_service, form_memo) VALUES (?,?,?,?,?,?,?)";
        const insertArr = [req.body.form_name, req.body.form_company, req.body.form_phone, req.body.form_budget, req.body.form_path, req.body.form_service, req.body.form_memo]
        await sql_con.promise().query(insertFormSql, insertArr);
    }
    res.json({ message: 'success' })
})

apiRouter.use('/insert_form', async (req, res, next) => {

    var insertFormSql = "INSERT INTO form_table (form_name, form_company, form_phone, form_budget, form_path, form_service, form_memo) VALUES (?,?,?,?,?,?,?)";
    for (let i = 0; i < 300; i++) {
        const insertArr = [`test_name${i}`, 'testCompany', `010-0000-0000`, '', '테스트 경로', `테스트 서비스`, `메모에요 메모!!`]
        await sql_con.promise().query(insertFormSql, insertArr);
    }

    res.json({ message: 'success' })
})


apiRouter.use('/form_data', async (req, res, next) => {
    const allCountFormDataSql = "SELECT count(*) FROM form_table";
    const allCountFormData = await sql_con.promise().query(allCountFormDataSql);
    const all_count = allCountFormData[0][0]['count(*)']

    const now_page = req.query.page;
    const show_row_num = req.query.show_row_num;
    const now_base = (now_page - 1) * 15
    const getFormDatasSql = `SELECT * FROM form_table ORDER BY id DESC LIMIT ${now_base}, ${show_row_num}`;
    const getFormDatas = await sql_con.promise().query(getFormDatasSql);
    const get_form_datas = getFormDatas[0];
    // console.log(get_form_datas);
    res.json({ get_form_datas, all_count: all_count })
})

apiRouter.post('/form_delete', async (req, res, next) => {
    console.log(req.body.selected_chk);
    for await (const setId of req.body.selected_chk) {
        const deleteFormSql = "DELETE FROM form_table WHERE id = ?";
        await sql_con.promise().query(deleteFormSql, [setId]);
    }
    res.json({ test: 'alsdjflasfd' })
})

apiRouter.use('/base_setting', async (req, res, next) => {
    console.log(req.body.siteInfo);
    if (req.method == 'POST') {
        const chkSiteBaseSetSql = "SELECT * FROM site_setting";
        const chkSiteBaseSet = await sql_con.promise().query(chkSiteBaseSetSql);
        const chk_site_base_set = chkSiteBaseSet[0][0]
        console.log(chk_site_base_set);

        const siteSetArr = [req.body.siteInfo.site_company, req.body.siteInfo.site_company_num, req.body.siteInfo.site_owner, req.body.siteInfo.site_address, req.body.siteInfo.site_tel, req.body.siteInfo.site_manager]
        if (!chk_site_base_set) {
            const insertSiteSetSql = "INSERT INTO site_setting (site_set,site_company,site_company_num,site_owner,site_address,site_tel,site_manager) VALUES ('main',?,?,?,?,?,?)";
            await sql_con.promise().query(insertSiteSetSql, siteSetArr);
        } else {
            const updateSiteSetSql = "UPDATE site_setting SET site_company = ?, site_company_num = ?, site_owner = ?, site_address = ?, site_tel = ?, site_manager = ?";
            await sql_con.promise().query(updateSiteSetSql, siteSetArr);
        }
    }

    const chkSiteBaseSetSql = "SELECT * FROM site_setting";
    const chkSiteBaseSet = await sql_con.promise().query(chkSiteBaseSetSql);
    const site_info = chkSiteBaseSet[0][0]
    console.log(site_info);
    res.json({ site_info })
})


apiRouter.get('/get_users', async (req, res, next) => {
    const getUsersSql = "SELECT * FROM users";
    const getUsers = await sql_con.promise().query(getUsersSql);
    let get_user = [...getUsers[0]]
    for (const user of get_user) {
        delete user.user_pwd
    }
    res.json({ get_user })
})

apiRouter.post('/user_update', async (req, res, next) => {
    const userInfo = req.body;
    if (userInfo.inputChk) {
        if (userInfo.updateType == 'update') {
            const userUpdateSql = "UPDATE users SET user_nick = ?, user_email = ?, user_rate = ? WHERE idx = ?";
            for await (const line of userInfo.inputChk) {

                await sql_con.promise().query(userUpdateSql, [userInfo.nickList[line], userInfo.emailList[line], userInfo.selected[line], userInfo.idList[line],]);
            }
        } else {
            const userDeleteSql = "DELETE FROM users WHERE idx = ?";
            for await (const line of userInfo.inputChk) {
                await sql_con.promise().query(userDeleteSql, [userInfo.idList[line]]);
            }
        }
    }
    res.json({ message: 'success!' })
})


// module.exports = router;
export { apiRouter }