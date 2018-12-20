class ResResult {

    constructor({code=0,data=null,msg=''}) {
        this.code = code;
        this.data = data,
        this.msg = msg;
    }
}
module.exports = ResResult;