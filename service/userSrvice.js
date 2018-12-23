var UserDao = require('../dao/UserDao');
var userDao = new UserDao();


exports.userService = {
    queryUserByName(name) {
        return userDao.queryUserByName(name);
    },
    add(user) {
       return userDao.addUser(user);
    }
}