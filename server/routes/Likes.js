const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async(req, res) => {
    const PostId = req.body.PostId;
    const UserId = req.user.id;
    console.log(PostId)
    const found = await Likes.findOne({where: {
        PostId: PostId,
        UserId: UserId
    }});
    if(!found)
        Likes.create({PostId: PostId, UserId: UserId}).then(()=>{
            res.json({liked: true});
    })
    else{
        Likes.destroy({where: {
            PostId : PostId,
            UserId : UserId
        }}).then(()=>{
            res.json({liked: false});
        })
    }
})

module.exports = router;