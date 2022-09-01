import dbConnect from "../../../../../database/connectDB.js";
const PostTemplate = require("../../../../../models/PostModel.js");
const jwt = require("jsonwebtoken");
import {getToken} from "next-auth/jwt"


await dbConnect();

const secret = process.env.NEXTAUTH_SECRET


const likes = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "PUT") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
     
    });
    if (token) {
      
      console.log(token)
      const post = await PostTemplate.findByIdAndUpdate(
        { _id: _id },
        { $push: { likes: token.email } }
      );
      
      post
        .save()
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED UPDATE" });
        });
      
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
  if (method === "GET") {
    
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    
    const token = await getToken({
      req: req,
      secret: secret,
      raw: true
    });
    
    if (token) {
      
      const post = await PostTemplate.findById(_id);

      if (!post) {
        return res.status(400).json({ error: "NOT FOUND" });
      }
      return res.status(200).json({
        post: post.likes,
        
      });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
    
  }
};

export default likes;
