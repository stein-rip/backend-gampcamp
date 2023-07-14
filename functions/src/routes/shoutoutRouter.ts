import express from "express";
import { getClient } from "../db";
import Shoutout from "../models/Shoutout";

const shoutoutRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

shoutoutRouter.get("/shoutouts", async (req, res) => {
  try {
    const name = req.query.name as string;
    const query: any = {};
    if (name) {
      query.$or = [{ to: name }, { from: name }];
    }
    const client = await getClient();
    const cursor = client.db().collection<Shoutout>("shoutouts").find(query);
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

shoutoutRouter.post("/shoutouts", async (req, res) => {
  try {
    const newShoutout: Shoutout = req.body;
    const client = await getClient();
    await client.db().collection<Shoutout>("shoutouts").insertOne(newShoutout);
    res.status(201).json(newShoutout);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default shoutoutRouter;
