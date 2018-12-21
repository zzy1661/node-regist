var express = require('express');
var router = express.Router();
// var usr=require('../dao/dbConnect.js');
var User = require('../entity/User');
var { userService } = require('../service/userSrvice');
var ResResult = require('../entity//ResResult')
var crypto = require('crypto');
var jwt = require("jsonwebtoken");

//登录
router.post('/login', function (req, res) {
    var { username, password } = req.body;
    var user = new User({ name: username, pw: password });
    userService.query(user, function (user) {

        /* console.log('Cookies: ', req.cookies)
        console.log('Signed Cookies: ', req.signedCookies)        
        res.cookie("user",user.name)  cookie*/
        /* var result = new ResResult({code:1,data:user});
        console.log('req.session.userName',req.session.userName)
        req.session.userName = username; 
        res.json(result); */
        var authToken = jwt.sign({username}, "secret");
        var result = new ResResult({code:0,data:{token: authToken}})
        res.status(200).json(result);
    })
})

//登出
router.post('/logout', function (req, res) {
    console.log(req.user)
    res.json(new ResResult({ code: 0, data: true }));
})

router.post('/regist', function (req, res) {
    var { username, password } = req.body;
    var user = new User({ naem: username, pw: password });
    userService.add(user, function (user) {
        res.json(new ResResult({ code: 0, data: user }));
    })
})


module.exports = router;

/* ejs 后台渲染
router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: 'HOME',test:res.locals.islogin});
});


router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        client=usr.connect();
        result=null;
        usr.selectFun(client,req.body.username, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
              var md5Pw = crypto..createHash('md5').update(req.body.password).digest('hex')
                if(result[0].password===md5Pw){
                    req.session.islogin=req.body.username;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    res.redirect('/home');
                }else
                {
                    res.redirect('/login');
                }
               }
        });
    });

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('home', { title: 'Home', user: res.locals.islogin });
});

router.route('/reg')
    .get(function(req,res){
        res.render('reg',{title:'注册'});
    })
    .post(function(req,res) {
        client = usr.connect();

        usr.insertFun(client,req.body.username ,req.body.password2, function (err) {
              if(err) throw err;
              res.send('注册成功');
        });
    });
 */

