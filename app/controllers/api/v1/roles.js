const db = global.db;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = (router) => {

  router.post('/', async (req, res) => {

    const role = await db.Roles.create({
      name: req.body.name,
      desc: req.body.desc
    });
    res.json({ Roles: role });
  });

  router.get('/', async (req, res) => {
    const roles = await db.Roles.findAll();
    res.json({ Roles: roles });
  });


  router.put('/updateRole', async (req, res) => {

    console.log(`A role is being updated`);
    const posts = await db.Roles.update(req.body, {
      where: {
        id: req.body.id,
      }
    });
    if (posts[0] === 0) {
      res.status(400).send({ msg: 'Role not found, enter correct roleId' });
    }
    else {
      res.json({ posts: posts });
    }
  });


  router.delete('/deleteRole', async (req, res) => {
    const posts = await db.Roles.destroy({
      where: {
        id: req.body.id,
      }
    });
    if (posts[0] === 0) {
      res.status(400).send({ msg: 'Invalid roleId' });
    }
    else {
      res.json({ posts: posts });
    }
  });

};
