var express = require('express');
var router = express.Router();
var Task = require('../entity/Task');
var { taskService } = require('../service/taskService');
var ResResult = require('../entity/ResResult')
var jwt = require("jsonwebtoken");
var uuid = require('uuid/v4')();

//查所有 /tasks?status=0
router.get('/',(req,res) => {
    var task = new Task({uid:req.user.id});
    //根据状态查
    var status = req.query.status;
   
    task.status = status;
    console.log('req.query',req.query,status)
    console.log(task)
    taskService.queryTasks(task).then(results=>{
        var r = new ResResult({code:0,data:results})
        res.json(r)
    })
    
})

//创建
router.post('/',(req,res)=>{
    var taskData = req.body.task;
    var task = new Task({
        uid:req.user.id,
        name:taskData.name,
        des:taskData.des,
        pid:taskData.pid||0,
        creatime: new Date().getTime(),
        startime:taskData.startime,
        endtime:taskData.endtime,
        status:5
    })
    taskService.addTask(task).then(result=>{
        if(result.affectedRows>0) {
            taskService.queryTasks(new Task({uid:req.user.id})).then(results=>{
                var r = new ResResult({code:0,data:results})
                res.json(r)
            })
        } else {
            var r = new ResResult({code:1,data:null,msg:'failed'})
            res.json(r)
        }
    })
})


//根据id查
router.get('/:id',(req,res) => {
    var id = req.params.id;
    var task = new Task({id:id,uid:req.user.id});
    taskService.queryTaskById(task).then(result=>{
        var r = new ResResult({code:0,data:result})
        res.json(r)
    })
})
router.get('/tree/:id',(req,res) => {
    var id = req.params.id;
    var task = new Task({id,uid:req.user.id});
    task.status = null;
    taskService.queryTaskTreeById(task).then(result=>{
        var r = new ResResult({code:0,data:result});
        res.json(r);
    })
})



module.exports = router;