const { prisma } = require("../config/helpers");

async function getLikesByPostId(req, res) {
  const postId = Number(req.params.id);
  const Likes = await prisma.like.findMany({
    where: {
      isActive: true,
      postId: postId,
    },
    // orderBy: {
    //   created_at: "desc",
    // },
  });

  return res.json(Likes);
}

async function createLike(req, res, next) {
  try {
    const like = {
      postId: Number(req.body.postId),
      audienceId: Number(req.body.audienceId),
    };

    const oldLike = await prisma.like.findFirst({
      where: {
        postId: like.postId,
        audienceId: like.audienceId,
      },
    });

    if (oldLike) {
      const Like = await prisma.like.update({
        where: {
          id: oldLike.id,
        },
        data: {
          isActive: true,
        },
      });
      return res.json(Like);
    }

    const Like = await prisma.like.create({
      data: like,
    });

    return res.json(Like);
  } catch (err) {
    next(err);
  }
}

async function deleteLike(req, res, next) {
  const id = Number(req.params.id);

  const Like = await prisma.like.update({
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
    message: "Like has been deleted.",
  });
}

module.exports = {
  getLikesByPostId,
  createLike,
  deleteLike,
};
