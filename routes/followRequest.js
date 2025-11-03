const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const followRequestController = require("../controllers/followRequestController");

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

const sendValidationResults = (req, res, next) => {
  const validations = validationResult(req);
  if (!validations.isEmpty()) {
    res.status(400).json({
      errors: validations.array(),
    });
  }
  next();
};

router.use(
  "/:id",
  param("id").isNumeric().withMessage("Comment Id should be a number"),
  sendValidationResults
);
router.post("/", followRequestController.createFollowRequest);

router.delete("/:id", followRequestController.deleteFollowRequest);

router.get(
  "/users/:id{followers=true}",
  followRequestController.getFollowersByUserId
);

router.get(
  "/users/:id{following=true}",
  followRequestController.getFollowingsByUserId
);

module.exports = router;
