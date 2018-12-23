class Task {

    constructor({id,name,des,pid=0,creatime,endtime,status=0,uid=-1}) {
        this.id = id;
        this.name = name;
        this.des = des;
        this.pid = pid;
        this.creatime = creatime;
        this.endtime = endtime;
        this.status = status; //0进行中/1已完成/2暂停/3终止/4超时/5未开始
        this.uid = uid;
    }
    
}
module.exports = Task;