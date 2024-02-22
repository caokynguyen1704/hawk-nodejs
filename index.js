const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const { UserLog } = require("./mysql/database");
const { checkJwt, checkToken, getJwt } = require('./lib/auth');
const { getAdminByEmailPassword, createAdmin } = require('./controller/admin');
const { savePostData } = require('./controller/user');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json());
function authenticate(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt, X-Auth-Token");
  const token = req.headers['x-auth-token'];
  const jwtToken = req.headers['jwt'];
  if (req.path.startsWith('/guest/')) {
    next();
  } else if (checkJwt(jwtToken)) {
    req.auth = 1;
    next();
  } else if (checkToken(token)) {
    req.auth = 0;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}


app.use(authenticate);

app.post('/robux/all', async (req, res) => {
  try {
    const users = await UserLog.findAll();
    res.json(users);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu người dùng.' });
  }
});
app.post('/robux', async (req, res) => {
  try {
    await savePostData(req.body)
    res.json({ok:1});
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu người dùng.' });
  }
});

app.post('/reset',async(req,res)=>{
  // try{
  //   const { userid } = req.body;
  //   if (!userid ) {
  //     return res.status(400).json({ error: 'ID are required' });
  //   }else{
  //     let data = JSON.stringify({
  //       "message": userid
  //     });
      
  //     let config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: 'https://apis.roblox.com/messaging-service/v1/universes/4719251467/topics/reset',
  //       headers: { 
  //         'x-api-key': 'UqU2Wl7YT0aEglszUzj7NUjo5IdAuqtnAarkAODwXh/Jjacw', 
  //         'Content-Type': 'application/json'
  //       },
  //       data : data
  //     };
      
  //     axios.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
      
  //   }
  // }catch (error) {
  //   res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu người dùng.' });
  // }
})
app.post('/gift',async(req,res)=>{
  try{
    const { amount,expire,id,message,type,userid } = req.body;
    if (!amount||!expire||!id||!message||!type||!userid ) {
      return res.status(400).json({ error: 'Missing' });
    }else{
      let package={
        amount:amount,
        expire:expire,
        id:id,
        message:message,
        type:type,
        userid:userid
      }
      let data = JSON.stringify({
        "message": JSON.stringify(package)
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apis.roblox.com/messaging-service/v1/universes/4719251467/topics/reset',
        headers: { 
          'x-api-key': 'UqU2Wl7YT0aEglszUzj7NUjo5IdAuqtnAarkAODwXh/Jjacw', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
  }catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu người dùng.' });
  }
})
app.post('/guest/login',async (req,res)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user= await getAdminByEmailPassword(email,password)
  if (user){
    const accessToken=getJwt(user.ID)
    res.json({jwt: accessToken, error:"Logged in successfully"});
  }else{
    res.json({ error: 'Unauthorized' });
  }
})
app.post('/payment',async(req,res)=>{

})
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});