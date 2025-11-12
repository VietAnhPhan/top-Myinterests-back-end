const { prisma } = require("../config/helpers");

async function getFollowersByUserId(req, res, next) {
  const isFollowers = req.query.followers;

  if (!isFollowers) {
    next();
  }

  const userId = Number(req.params.id);
  const Followers = await prisma.followRequest.findMany({
    where: {
      isActive: true,
      followeeId: userId,
    },
    select: {
      follower: true,
    },
  });

  return res.json(Followers);
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
      const followRequest = await prisma.followRequest.update({
        where: {
          id: oldFollowRequest.id,
        },
        data: {
          isActive: true,
        },
      });
      return res.json(followRequest);
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
  getFollowersByUserId,
  getFollowingsByUserId,
  createFollowRequest,
  deleteFollowRequest,
};
