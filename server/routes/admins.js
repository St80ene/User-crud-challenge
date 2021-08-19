import express from 'express';
const router = express.Router();

/* GET admins listing. */
router.get('/', function (req, res, next) {
  res.send('Welcome Admins');
});

export default router;
