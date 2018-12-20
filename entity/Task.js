class Task {

    constructor({id,name,describe,pid,creatime,endtime,status}) {
        this.id = id;
        this.name = name;
        this.describe = describe;
        this.pid = pid;
        this.creatime = creatime;
        this.endtime = endtime;
        this.status = status;
    }
    
}
module.exports = Task;