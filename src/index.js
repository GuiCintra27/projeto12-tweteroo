import express from "express";
import cors from 'cors';
import users from "./users.js";
import tweets from "./tweets.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sign-up", (req, res) =>{
  const {username, avatar} = req.body;

  if (!username || !avatar){
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  const register = {
    username,
    avatar
  };

  users.push(register);
  res.sendStatus(201);
});

app.post("/tweets", (req, res) =>{
  const {username, tweet} = req.body;

  if (!username || !tweet){
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  const newTweet = {
    username,
    tweet
  };

  tweets.push(newTweet);
  res.sendStatus(201);
});

app.get("/tweets", (req, res) => {
  const showTweets = [];
  for (let i = 0; i < 100 && tweets[i] !== undefined; i++){
    const tweetUserImg = users.find((item) => item.username === tweets[i].username);
    showTweets.push(
      {
        username: tweets[i].username,
        avatar: tweetUserImg.avatar,
        tweet: tweets[i].tweet
      }
    );
  }
  res.send(showTweets);
});

app.listen(5000);