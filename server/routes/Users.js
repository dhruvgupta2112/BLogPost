const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async(req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash
        })
        res.json("SuCcEsS");
    })
})

router.post("/login",  async(req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    if(!user) res.json({error: "user doesnot exist"});
    else
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "Wrong username or password"});
        else{
            const accessToken = sign({username: user.username, id:user.id}, "secretCod");
             res.json({accessToken: accessToken, username: username, id: user.id});
        }
    })
})

router.get("/",validateToken, (req, res)=>{
    res.json(req.user);
})

module.exports = router;