const { Admin } = require("../mysql/database");

async function getAdminByEmailPassword(email, password) {
    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return null;
        }
        if (admin.password === password) {
            return admin;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
async function createAdmin(email, password) {
    try {
      
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        throw new Error('Email is already registered');
      }
      const newAdmin = await Admin.create({ email: email, password: password });
      return newAdmin;
    } catch (error) {
      console.error('Error during admin creation:', error);
      return null;
    }
  }
module.exports={
    getAdminByEmailPassword,
    createAdmin
}