const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
  res.render('pages/index', {
    name: 'World!'
  });
});

module.exports = router;
