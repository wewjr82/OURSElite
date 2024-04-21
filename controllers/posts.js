const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      const posts = await Post.find({ user: req.user.id });

      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", {
        posts: posts,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();

      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      }); //add comments to ejs
    } catch (err) {
      console.log(err);
    }
  },

createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content

      await Post.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error uploading file" });
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Fetch posts of the user
      const posts = await Post.find({ user: req.params.userId })
        .sort({ createdAt: "desc" })
        .lean();

      res.render("userProfile.ejs", { user, posts });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // filterPosts: async (req, res) => {
  //   try {
  //     const { state, industry } = req.query;
  //     let query = {};

  //     if (state && state !== "All States") {
  //       query.state = state;
  //     }
  //     if (industry && industry !== "All Industries") {
  //       query.industry = industry;
  //     }

  //     const filteredPosts = await Post.find(query);

  //     res.render("filtered_posts", {
  //       selectedState: state || "All States",
  //       selectedIndustry: industry || "All Industries",
  //       filteredPosts: filteredPosts,
  //     });
  //   } catch (err) {
  //     console.error("Error filtering posts:", err);
  //     res.status(500).send("Error filtering posts. Please try again later.");
  //   }
  // },

  
};
