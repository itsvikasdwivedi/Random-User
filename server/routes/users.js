import USER from "../models/user.js";
import { Router } from "express";

import fetch from "node-fetch";

const userRouter = Router();

userRouter.post("/", (req, res) => {
  let get = getPost();
  res.send(get);
});

async function getPost() {
  const myPosts = await fetch("https://randomuser.me/api?results=50");
  const response = await myPosts.json();
  let result = response.results;

  for (let i = 0; i < result.length; i++) {
    const user = new USER({
      picture: result[i].picture.large,
      first: result[i].name.first,
      last: result[i].name.last,
      gender: result[i].gender,
      email: result[i].email,
      location: result[i].location.street.name,
      pin: result[i].location.street.number,
      nat: result[i].nat,
    });
    user.save();
  }
}

userRouter.get("/", async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || 0);
  const total = await USER.countDocuments();
  const blog = await USER.find()
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  try {
    res
      .status(200)
      .send({ totalPages: Math.ceil(total / PAGE_SIZE), blog: blog });
  } catch (e) {
    res.status(404).send({ message: "Not Found", Error: e });
  }
});

userRouter.delete("/", async (req, res) => {
  await USER.deleteMany();

  res.send({ message: "Deleted Successfull" });
});

userRouter.get("/search/:key", async (req, res) => {
  let sear = await USER.find({
    $or: [{ gender: req.params.key }],
  });
  res.send(sear);
});

export default userRouter;
