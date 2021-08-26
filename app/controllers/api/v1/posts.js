const db = global.db;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = (router) => {

  router.post('/', async (req, res) => {
    req.body.userId = req.user.id;
    const post = await db.Posts.create(req.body);
    res.json({ post: post });
  });


  //pagination
  router.get('/posts', async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
    const PostsWithCount = await db.Posts.findAndCountAll({
      limit: size,
      offset: page * size
    });
    res.send({
      content: PostsWithCount.rows,
      totalPages: Math.ceil(PostsWithCount.count / Number.parseInt(size))
    });
  })

  router.get('/', async (req, res) => {
    const posts = await db.Posts.findAll({
      include: [{
        model: db.Users
      }]
    });
    res.json({ posts: posts });
  });

  router.get('/userPosts', async (req, res) => {

    const userExists = await db.Users.findByPk(req.body.userId);
    if (userExists === null) {
      res.status(400).send({ msg: 'User not found, enter correct userId' });
    } else {
      const posts = await db.Posts.findAll({
        where: {
          userId: req.body.userId
        }
      });
      res.json({ posts: posts });
    }

  });

  router.put('/update', async (req, res) => {
    req.body.userId = req.user.id;
    console.log(`UserId ${req.body.userId} is trying to update a post`);
    const posts = await db.Posts.update(req.body, {
      where: {
        id: req.body.id,
        userId: req.body.userId
      }
    });
    if (posts[0] === 0) {
      res.status(400).send({ msg: 'Invalid postId or UserId' });
    }
    else {
      res.json({ posts: posts });
    }


  });

  router.delete('/delete', async (req, res) => {
    req.body.userId = req.user.id;
    console.log(`UserId ${req.body.userId} is trying to delete a post`);
    const posts = await db.Posts.destroy({
      where: {
        id: req.body.id,
        userId: req.body.userId
      }
    });
    if (posts[0] === 0) {
      res.status(400).send({ msg: 'Invalid postId or UserId' });
    }
    else {
      res.json({ posts: posts });
    }
  });


  router.delete('/deleteTable', async (req, res) => {
    const posts = await db.Posts.destroy({
      truncate:true
    });
    if (posts[0] === 0) {
      res.status(400).send({ msg: 'Invalid postId or UserId' });
    }
    else {
      res.json({ posts: posts });
    }
  });

  router.get('/getCount', async (req, res) => {


    const userExists = await db.Users.findByPk(req.body.userId);
    if (userExists === null) {
      res.status(400).send({ msg: 'User not found, enter correct userId' });
    } else {
      const { count, rows } = await db.Posts.findAndCountAll({
        where: {
          userId: req.body.userId
        }
      });
      res.json({ postCount: count });
    }



    
  });

};
