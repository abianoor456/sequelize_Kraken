const db = global.db;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = (router) => {
  router.get('/', async (req, res) => {
    const users = await db.Users.findAll({});
    res.status(200).json({ users: users });
  });


  router.post('/login', async (req, res) => {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
        password: db.Users.getHashedPassword(req.body.password),
      }
    });
    if (user) {
      res.json({ user: user, token: user.createAPIToken() });
    } else {
      res.status(400).json({ msg: 'Invalid email or password' });
    }
  });

  router.get('/me', async (req, res) => {
    const user = await db.Users.findOne({
      where: {
        id: req.user.id
      }
    });
    if (user) {
      res.json({ user: user, token: user.createAPIToken() });
    } else {
      res.status(400).json({ msg: 'User not found' });
    }
  });

  router.post('/signup', async (req, res) => {
    const isAlreadyExist = await db.Users.count({
      where: { email: req.body.email }
    });
    if (isAlreadyExist) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    req.body.password = db.Users.getHashedPassword(req.body.password);
    
    const user = await db.Users.create({
      email: req.body.email,
      password: req.body.password
    });

    req.body.roleId.forEach(async element => {
      const userRole = await db.Userroles.create({
        roleId: element,
        userId: user.id
      });
    });

    
   
    res.status(200).json({ user: user, token: user.createAPIToken() });
  });
};
