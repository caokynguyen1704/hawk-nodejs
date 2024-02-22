const Admin = require('./admin');
const sequelize = require('./config');
const UserLog = require('./user');
const UserData=require('./userstore')

async function syncData(table,name) {
    try {
        await  table.sync({ alter: true })
            .then(() => {
                console.log('['+name+'] Sync database');
            })
    } catch (err) {
        console.error("["+name+"]"+ err);
    }
}
async function init(){
    await syncData(UserLog,"UserLog")
   await syncData(Admin,"Admin")
   await syncData(UserData,"UserData")
}
init()
module.exports={
    UserLog,
    Admin,
    UserData
}