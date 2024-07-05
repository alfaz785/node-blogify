const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

// ALL GET METHOD HANDLE --------------------------

router.get("/add-new", (req, res) => {
  res.render("add-blog", {
    user: req.user,
  });
});
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comments = await Comment.find({ blogId: req.params.id });

  res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

// ALL POST METHOD HANDLE --------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  // return res.redirect(`/`);
  return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
