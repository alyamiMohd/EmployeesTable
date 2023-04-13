const express = require('express')
const app = express();
const path = require('path')
const engine = require('ejs-mate');
const mongoose = require('mongoose')
const Employee = require('./models/empModel')
const empRouter = require('./routes/employee')
const flash = require('connect-flash')
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const session = require('express-session');
app.use(session({secret:'employeesLocker'}, {saveUninitialized:true}));

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

mongoose.connect('mongodb://127.0.0.1:27017/empDatabase')
.then(()=>{
    console.log("Database connected");
})
.catch((e)=>{
    console.log("Something went wrong!")
    console.log(e)
})



app.use('/',empRouter)
app.engine('ejs', engine);
app.set(path.join(__dirname,'/views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))


app.listen(8888,(req,res)=>{
    console.log("Listening on port 8888");
})