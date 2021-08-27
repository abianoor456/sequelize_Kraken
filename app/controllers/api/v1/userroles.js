const db = global.db;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = (router) => {


    router.get('/', async (req, res) => {
        const userroles = await db.Userroles.findAll({ include: { all: true }});
        res.status(200).json({ Userroles: userroles });
    });

    router.get('/userRoles', async (req, res) => {
        const userroles = await db.Userroles.findAll( { include: { all: true },
            where: { userId: req.body.userId }
           });
        res.status(200).json({ Userroles: userroles });
    });

    router.get('/getRoles', async (req, res) => {
        const getRoles = await db.Userroles.findAll( { include: { all: true },
            where: { roleId: req.body.roleId }
           });
        res.status(200).json({ GetRoles : getRoles });
    });


};
