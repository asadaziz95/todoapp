var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {todoModel} = require('./models/todo');
var {userModel} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo =  todoModel({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get('/todos',(req,res)=>{
    todoModel.findById('5a7df4c47afd3b0a6004823f').then((todos)=>{
            res.send({todos})
    },(err)=>{
        res.status(400).send(err);
    })
})


app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //my code
    // console.log(mongoose.Types.ObjectId.isValid(id));
    // if(mongoose.Types.ObjectId.isValid(id))
    // {
    //     todoModel.findById(id).then((todo)=>{
    //             if(!todo){
    //                 return res.status(400).send({});
    //             }
    //             else{
    //                 return res.send({todo});
    //             }
    //     },(err)=>{
    //         res.status(400).send({})
    //     })
    // }
    // else
    // {
    //     res.status(404).send('Your ID might not be correct');
    // }

    //tutorial code

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).send();
    }
    todoModel.findById(id).then((todo)=>{
            if(!todo){
               return res.status(400).send(); 
            }
            res.send({todo});
    }).catch((err)=>{
            res.status(400).send({});
    })
    

})




// assinging port tp server
app.listen(3000,()=>{
    console.log("Started on port 3000");
})

