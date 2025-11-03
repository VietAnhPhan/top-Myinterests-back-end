const { prisma } = require("../config/helpers");

async function getPost(req, res) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json(post);
}

async function getPosts(req, res) {
  const posts = await prisma.user.findMany({
    where: {
      isActive: true,
    },
    // orderBy: {
    //   created_at: "desc",
    // },
  });

  return res.json(posts);
}

async function createPost(req, res, next) {
  try {
    const post = {
      body: req.body.body,
      authorId: Number(req.body.authorId),
    };

    const Post = await prisma.post.create({
      data: post,
    });

    return res.json(Post);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const postId = parseInt(req.params.id);
    const body = req.body.body;

    const Post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        body: body,
      },
    });

    return res.json(Post);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  const id = Number(req.params.id);

  const user = await prisma.user.update({
    where: {
      id: id,
      AND: {
        isActive: true,
      },
    },
    data: {
      isActive: false,
    },
  });

  return res.json({
    message: "Post has been deleted.",
  });
}

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
