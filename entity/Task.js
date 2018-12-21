class Task {

    constructor({id,name,des,pid=0,creatime=new Date().getTime(),endtime,status=0}) {
        this.id = id;
        this.name = name;
        this.des = des;
        this.pid = pid;
        this.creatime = creatime;
        this.endtime = endtime;
        this.status = status;
    }
    
}
module.exports = Task;