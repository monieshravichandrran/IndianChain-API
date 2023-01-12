const User = require("../model/Users");
const mongoose = require("mongoose");

//Type
// 1 => People
// 2 => Educational Institutions
// 3 => Companies, Organizations
// 4 => Govt, Eseva

const signupHandler = async(payload) => {
    if(payload.type!=4){
        return "Not a Govt Eseva account";
    }
    const userExist = await User.find({email: payload.email});
    if(userExist?.length){
        return "User already exist";
    }

    const result = await User.collection.insertOne(payload);
    return "Account created";
}

const loginHandler = async(email,password,address) =>{
    const usersWithEmailOrPhno = await User.find({email: email});
    console.log(usersWithEmailOrPhno);
    if(usersWithEmailOrPhno?.length){
        const authenticatedUser = await User.find({email: email, password: password});
        if(authenticatedUser?.length){
            const validUser = await User.find({email: email, password: password, address: address});
            if(validUser?.length){
                return "Valid User";
            }
            return "Address don't match";
        }
        return "Invalid Password";
    }
    return "User doesn't exist";
};

module.exports = {login: loginHandler, signup: signupHandler};