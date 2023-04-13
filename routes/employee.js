const express = require('express')
const router = express.Router();
const Employee = require('../models/empModel')
router.use(express.urlencoded({extended:true}))


router.get('/',(req,res)=>{
    res.redirect('/employees')
})

router.get('/employees',async (req,res)=>{
    const employees =await Employee.find({});
    res.render('home',{employees})
})

router.get('/employees/new',(req,res)=>{
    res.render("new")
})

router.post('/employees',async (req,res)=>{
    const {Id,Name,No,Email} = req.body;
    await Employee.insertMany({Id,Name,No,Email})
    req.flash('success','Employee Successfully added.')
    res.redirect('/employees')
})

router.get('/employees/:id',async(req,res)=>{
    const Id = req.params.id;
    const foundEmp = await Employee.findOne({Id:Id});
    if(!foundEmp){
        req.flash('error','No Employee Found!.')
        return res.redirect('/employees')
    }
     res.render('show',{foundEmp})
})

router.delete('/employees/:id',async(req,res)=>{
    const {id} = req.params;
    await Employee.findOneAndDelete({Id:id})
    req.flash('success','Successfully Deleted!')
    res.redirect('/employees')
})


router.get('/employees/:id/edit',async (req,res)=>{
    const Id = req.params.id;
    const foundEmp = await Employee.findOne({Id:Id});
    if(!foundEmp){
        req.flash('error','No Employee Found!.')
        return res.redirect('/employees')
    }
     res.render('edit',{foundEmp})
})


router.patch('/employees/:id',async (req,res)=>{
    const id = req.params.id;
    const {Id, Name,No,Email} = req.body;
    const foundEmp = await Employee.findOneAndReplace({Id:id},{
        Id,
        Name,
        No,
        Email
    });
    res.redirect('/employees')
})
module.exports = router;