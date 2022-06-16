import { connectDB } from "../../../../database/connectDB"
const PostTemplate = require("../../../../models/PostModel")
const jwt = require("jsonwebtoken")

connectDB();

const post = async (req, res) => {
  const {
    query: { _id },
    method,
  } = req;

  if (method === "GET") {
    const post = await PostTemplate.findById(_id).populate("user");

    if (!post) {
      return res.status(400).json({ error: "Post Not Found" });
    }
    return res.status(200).json(post);
  }
 if (method === "DELETE") {
   if (!("token" in req.cookies)) {
     return res.status(401).json({ error: "TOKEN NOT FOUND" });
   }
   let decoded;
   const token = req.cookies.token;
   if (token) {
     decoded = jwt.verify(token, "secretBlog");
   } else {
     return res.status(400).json({ error: "UNABLE TO VERIFY" });
   }
   if (decoded) {
     const post =  PostTemplate.findByIdAndRemove({ _id: _id });
     post
       .then((data) => {
         console.log(data)
         res.status(200).json(data);
       })
       .catch((error) => {
         res.status(400).json({ error: "FAILED TO DELETE" });
       });
   } else {
     return res.status(400).json({ error: "FAILED TO DECODE" });
   }
 }
};

export default post;
