const Permission = require("../model/Permission");

const givePermission = async (citizen, authority, type) => {
  console.log(citizen, authority, type)
  const data = await Permission.find({ citizen: citizen, authority: authority });
  if (data?.length > 0) {
    if (data[0].type == 2 || type == data[0].type) {
      return { msg: "You have access for this user" };
    }
  }
  const result = await Permission.collection.insertOne({ citizen: citizen, authority: authority, type: type });
  if (type == 1)
    return { msg: "Read Access Granted" };
  return { msg: "Write Access Granted" };
}

module.exports = { givePermission: givePermission }