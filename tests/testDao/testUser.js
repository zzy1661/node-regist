var UserDao = require('../../dao/UserDao');
var User = require('../../entity/User');
var dao = new UserDao();
var newUser = new User({name:'test4',rawPw:'111111'});
newUser.id = require('uuid/v4')().replace(/-/g,'');
dao.addUser(newUser).then((result)=>{
    console.log(result)
}).catch(e=>{
    console.log(e);
})