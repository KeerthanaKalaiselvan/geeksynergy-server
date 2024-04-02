const express = require("express");
const cors = require('cors')
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser')
const fsPromise = require("fs/promises");
app.use(bodyParser.json())
app.use(cors({ origin: "http://localhost:3000" }))


const userDetails = JSON.parse(
    fs.readFileSync(`${__dirname}/data/userDetails.json`)
);
app.post('/api/signup', (req, res) => {
    const {name,email,number,password} = req.body
    const found = userDetails.findIndex((user) => user.email === email)
    let myobj = { name, email, number, password };
    
    if (found === -1) {
        userDetails.push(myobj)
        fs.writeFileSync(`${__dirname}/data/userDetails.json`, JSON.stringify(userDetails))
       
        res.json({ message:"success"})
    }
    else {
        res.json({ message:"User already exsist, try again!" })
    }
})
app.post('/api/login', (req, res) => {
    const { name, email, number, password } = req.body
    const found = userDetails.findIndex((user) => user.email === email)
    const user = userDetails[found];
    
    if (found === -1) {
        res.json({ message: "Sorry! Wrong credentials, Retry" })
    }
    else {
        if(password===user.password && name===user.name && number===user.number)
            res.json({ message: "success" })
        else
            res.json({ message: "Sorry! Wrong credentials, Retry" })
    }
})
const port = 8000;



app.listen(port, () => console.log(`app is running on the port ${port}`))