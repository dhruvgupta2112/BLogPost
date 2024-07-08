const express = require("express");
const db = require("./models");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors());

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on ${port}`);
    });
});

