class Task {

    constructor({id,name,des,pid=0,startime,endtime,creatime,status=0,uid=-1,del=0}) {
        this.id = Number(id);
        this.name = name;
        this.des = des;
        this.pid = pid;
        this.startime = startime;
        this.endtime = endtime;
        this.status = status; //0进行中/1已完成/2暂停/3超时/4未开始
        this.uid = uid;
        this.del = del;
        this.creatime = creatime;
    }
    
}
module.exports = Task;