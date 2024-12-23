const User=require('../models/user');

async function handleSignup(req,res){
    const {username, password,email} = req.body;
    await User.create({username, email,password});
    return res.render('home');
}

module.exports = {handleSignup}