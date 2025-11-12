const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const likeController = require("../controllers/likeController");

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
  param("id").isNumeric().withMessage("Like Id should be a number"),
  sendValidationResults
);
router.post("/", likeController.createLike);

router.delete("/:id", likeController.deleteLike);

router.get("/posts/:id", likeController.getLikesByPostId);

module.exports = router;
