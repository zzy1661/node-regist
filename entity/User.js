var {md5} = require('../sec');

class User {
    constructor({id,name,pw,role,email,rawPw}) {
        this.id = id;
        this.name = name;
        this.pw = pw || md5(rawPw),
        this.role = role;
        this.email = email; 
        this.rawPw = rawPw;   
    }
}
module.exports = User;