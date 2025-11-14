const { prisma } = require("../config/helpers");

async function getFollowingRequest(req, res, next) {
  const isFollower = req.query.follower;

  if (!isFollower) {
    return next();
  }

  const followeeId = Number(req.params.id);
  const followingRequest = await prisma.followRequest.findFirst({
    where: {
      isActive: true,
      followeeId: followeeId,
    },
  });

  return res.json(followingRequest);
}

async function getFollowingsByUserId(req, res) {
  const isFollowing = req.query.following;

  if (!isFollowing) {
    res.json();
  }

  const userId = Number(req.params.id);
  const Following = await prisma.followRequest.findMany({
    where: {
      isActive: true,
      followerId: userId,
    },
    select: {
      followee: true,
    },
  });

  return res.json(Following);
}

async function createFollowRequest(req, res, next) {
  try {
    const followRequest = {
      followerId: Number(req.body.followerId),
      followeeId: Number(req.body.followeeId),
    };

    const oldFollowRequest = await prisma.followRequest.findFirst({
      where: {
        followerId: followRequest.followerId,
        followeeId: followRequest.followeeId,
      },
    });

    if (oldFollowRequest) {
      return res.json(oldFollowRequest);
    }

    const FollowRequest = await prisma.followRequest.create({
      data: followRequest,
    });

    return res.json(FollowRequest);
  } catch (err) {
    next(err);
  }
}

async function deleteFollowRequest(req, res, next) {
  const id = Number(req.params.id);

  const FollowRequest = await prisma.followRequest.update({
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
    message: "FollowRequest has been deleted.",
  });
}

module.exports = {
  getFollowingRequest,
  getFollowingsByUserId,
  createFollowRequest,
  deleteFollowRequest,
};
