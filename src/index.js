import express from "express";
import cors from 'cors';
import users from "./users.js";
import tweets from "./tweets.js";

const app = express();
app.use(cors());

app.get("/tweets", (req, res) => {
  const showTweets = [];
  for (let i = 0; i < 10 && tweets[i] !== undefined; i++){
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

app.get("/holidays/:month", (req, res) => {
  const month = req.params.month;
  const isHoliday = holidays.filter((item) => {
    if (item.date[1] !== '/') {
      if (item.date.substring(0,2) === month) {
        return item;
      }
    } else {
      if (item.date[0] === month) {
        return item;
      }
    }
  });
  res.send(isHoliday);
});

app.listen(5000);