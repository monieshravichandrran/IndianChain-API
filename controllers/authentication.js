const User = require("../model/Users");
const mongoose = require("mongoose");

//Type
// 1 => People
// 2 => Educational Institutions
// 3 => Companies, Organizations
// 4 => Govt, Eseva

const signupHandler = async (payload) => {
    if (payload.usertype != 4) {
        return "Not a Govt Eseva account";
    }
    const userExist = await User.find({ email: payload.email });
    if (userExist?.length) {
        return "User already exist";
    }
    const newload = {email: payload.email, password: payload.password, address: payload.address};
    const result = await User.collection.insertOne(newload);
    return "Account created";
}

const loginHandler = async (email, password, address) => {
    const usersWithEmailOrPhno = await User.find({ email: email });
    if (usersWithEmailOrPhno?.length) {
        const authenticatedUser = await User.find({ email: email, password: password });
        if (authenticatedUser?.length) {
            const validUser = await User.find({ email: email, password: password, address: address });
            if (validUser?.length) {
                return { msg: "Valid User", type: validUser[0].type };
            }
            return { msg: "Address don't match", type: -1 };
        }
        return { msg: "Invalid Password", type: -1 };
    }
    return { msg: "User doesn't exist", type: -1 };
};

module.exports = { login: loginHandler, signup: signupHandler };