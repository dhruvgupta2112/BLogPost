const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/",validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({
        include: [Likes],
         order: [["createdAt", "DESC"]]
        });
    const listOfLikes = await Likes.findAll({
        attributes: ['PostId'],
        where: {
            UserId: req.user.id
        }
    })
    res.json({
        listOfPosts: listOfPosts,
        listOfLikes: listOfLikes
    });
});

router.get("/byId/:id", async(req, res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post("/", validateToken, async(req, res) => {
    let post = req.body;
    post.username = req.user.username;
    await Posts.create(req.body);
    res.json("POSTED");
});

router.delete("/:PostId", validateToken, async(req, res) => {
    let PostId = req.params.PostId;
    console.log("hindi mein " + PostId);
    try{
        Posts.destroy({
            where: {
                id: PostId
            }
        }).then(()=>{
            res.json("Post deleted");
        })
    }catch(err){
        console.log(err);
    }
});
module.exports = router;