import { Database } from "arangojs";
import express from 'express';
import queryAccountsUserFollows from "./queries/queryAccountsUserFollows";
import queryFanOut from "./queries/queryFanOut";
import queryFollowerCountOfUser from "./queries/queryFollowerCountOfUser";
import queryPostsOfAccount from "./queries/queryPostsOfAccount";
import queryPostsOfFollowedUsers from "./queries/queryPostsOfFollowedUsers";
import queryRandomUsers from "./queries/queryRandomUsers";
import queryTopFollower from "./queries/queryTopFollower";
import queryTopFollowersOfUsersWithTopFollowers from "./queries/queryTopFollowersOfUsersWithTopFollowers";
import queryTopLikedTweets from "./queries/queryTopLikedTweets";
import cors from 'cors';

const PORT = 10005;

const startWebservice = (db: Database) => {
  const app = express();

  app.use(cors());

  //1. Posts of Accounts
  app.get('/api/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    await queryPostsOfAccount(db, userId).then(result => res.json(result)).catch(e => res.status(500).json(e));
  });

  //2. Top 100 Accounts with most Followers
  app.get('/api/top100followers', async (req, res) => {
    await queryTopFollower(db, 100).then(result => res.json(result)).catch(e => res.status(500).json(e));
  });

  //3. Top 100 Accounts with following most of Top 100 Follower Accounts
  app.get('/api/top100followersoftop100followers', async (req, res) => { 
    const top100 = await queryTopFollower(db, 100);
    const top100Ids = top100.map(result => "users/"+result.user._key);
    console.log(top100Ids)
    await queryTopFollowersOfUsersWithTopFollowers(db, top100Ids, 100).then(result => res.json(result)).catch(e => res.status(500).json(e));
  })
    
  //4.1 Amount Follower of User
  app.get('/api/followercount/:userId', async (req, res) => {
    await queryFollowerCountOfUser(db, req.params.userId).then(result => res.json(result)).catch(e => res.status(500).json(e));
  })

  //4.2 Amount of followed Users of User
  app.get('/api/followingcount/:userId', async (req, res) => {
    await queryAccountsUserFollows(db, req.params.userId).then(result => res.json(result)).catch(e => res.status(500).json(e));
  })
  
  //4.3 Top 25 newest or popular tweets of User
  app.get('/api/top25tweets/:userId', async (req, res) => { 
    await queryPostsOfFollowedUsers(db, req.params.userId, 'newest', 25).then(result => res.json(result)).catch(e => res.status(500).json(e));
  })

  //5. FANOUT
  app.get("/api/fanout/:userId", async (req, res) => {
    const userId = req.params.userId;

    await queryFanOut(db, userId).then(result => {
      res.send(result);
    });
  })
  
  //6. Top 25 tweets of with some words
  app.get('/api/top25tweetswithwords/:words', async (req, res) => {
    const words = req.params.words.split("%20");
    await queryTopLikedTweets(db, 25, words).then(result => res.json(result)).catch(e => res.status(500).json(e));
  });

  app.get('/api/top25tweetswithwords/', async (req, res) => {
    await queryTopLikedTweets(db, 25).then(result => res.json(result)).catch(e => res.status(500).json(e));
  });


  //ADDITONAL Queries
  app.get('/api/randomUsers', async (req, res) => { 
    await queryRandomUsers(db, 5).then(result => res.json(result)).catch(e => res.status(500).json(e));
  })
  app.get('/api/randomUsers/:amountUsers', async (req, res) => { 
    try {
      const amountUsers = parseInt(req.params.amountUsers);
      await queryRandomUsers(db, amountUsers).then(result => res.json(result)).catch(e => res.status(500).json(e));
    }
    catch (e) { }
    
  })


  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`),
  );

};

export default startWebservice;