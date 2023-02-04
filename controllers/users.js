const mongoose = require("mongoose");

const User = require("../model/Users");

const getAddress = async(email) => {
    const data = await User.find({email: email});
    if(data?.length>0){
        return {found: true,address: data[0].address};
    }
    return {found: false};
}

module.exports = {getAddress: getAddress}