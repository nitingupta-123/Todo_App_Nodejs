const router = require('express').Router();
const Todo = require('../models/todoSchema')

router.get('/',(req,res)=>{
    Todo.find({})
    .exec()
    .then((allTodo)=>{
        
        let notDoneTodo = allTodo.filter((todo)=>{
            return !todo.isdone;
        })

        let doneTodo = allTodo.filter((todo)=>{
            return todo.isdone;
        })

        res.render('index',{todos:notDoneTodo,doneTodos:doneTodo});
    })
    .catch((err)=>{
        console.log(err);
        
    });
    
});

router.post('/todos',(req,res)=>{
    console.log(req.body);
    new Todo({
        description: req.body.description
    }).save()
    .then((newtodo)=>{
        console.log(newtodo);
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/');
    });
    
});

router.post('/todos/:id/completed',(req,res)=>{

    Todo.findById(req.params.id)
    .exec()
    .then((todo)=>{
        todo.isdone=!todo.isdone;
        return todo.save();
    })
    .then(()=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/');
    });
    
});


router.get('/todos/:id/deleted',(req,res)=>{

    Todo.findByIdAndRemove(req.params.id)
        .then((todo) => {
            res.redirect('/');
        }, (err) => {
            console.log(err);
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
            res.redirect('/');
        });
    
});



module.exports = router;