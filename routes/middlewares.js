const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        // res.status(403).send('로그인 필요');
        errData = { err_chk: 'notLogin', move: req.baseUrl }
        res.status(403).render('error', { errData })
    }
};


const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('error!!!!!!!!!!!!!!');
    } else {
        const message = encodeURIComponent('isLogged');
        res.redirect(`/?error=${message}`);
    }
};

export { isLoggedIn, isNotLoggedIn }