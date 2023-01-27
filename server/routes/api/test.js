const router = require('express').Router();

/**
 * @route   POST /users
 * @desc    Register new user
 * @access  Public
 */
router.get('/api', async (req, res) => {
  console.log(req.body);
  // try {
  //   await user.save();
  //   const token = await user.generateAuthToken();
  //   res.status(201).send({ user, token });
  // } catch (e) {
  //   res.status(400).send(e);
  // }
});

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Private
 */
// router.get('/', auth, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
