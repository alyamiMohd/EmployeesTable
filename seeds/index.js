const mongoose = require('mongoose')
const Employee = require('../models/empModel')
const names = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/empDatabase')
.then(()=>{
    console.log("Database connected");
})
.catch((e)=>{
    console.log("Something went wrong!")
    console.log(e)
})


const seedDB = async() => {
    await Employee.deleteMany({})
    for (let i =0; i<names.length; i++) {
        const emp = new Employee ({
            Id:i+1,
            Name:`${names[i]}`,
            No:i,
            Email:`${names[i]}@gmail.com`
        })
        await emp.save();
    }
}

seedDB();
