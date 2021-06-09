const { User, Profile } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const ApiError = require("../error/apiError");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "30 days",
  });
};

class UserController {
  async registration(req, res, next) {
    // '/registration'
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        //validate
        return next(ApiError.badRequest("Uncorrect email or password"));
      }

      const candidate = await User.findOne({ where: { email } });
      console.log(candidate);
      if (candidate) {
        // Email use?
        return next(ApiError.badRequest("User with this email already exists"));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const { dataValues: user } = await User.create({
        email,
        role,
        password: hashPassword,
      });

      const token = generateJwt(user.id, user.email, user.role);

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      return res.json({ token, user, message: "User has been created " });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Failed. Please repeat request!" });
    }
  }

  async login(req, res, next) {
    // '/login'
    try {
      const { email, password } = req.body;

      console.log(email, password);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("User doesn`t exists"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Password is not correct"));
      }

      const token = generateJwt(user.id, user.email, user.role);
      const userRole = user.role;
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return res.json({ token, userRole });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Failed. Please repeat request!" });
    }
  }

  async check(req, res, next) {
    // '/auth'
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getUsers(req, res, next) {
    // '/'
    try {
      const users = await User.findAll({});
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async boost(req, res, next) {
    // '/boost/:id'
    try {
      const id = req.params.id;

      await User.findOne({ where: { id } }).then(async (result) => {
        return res.json(
          await result.update({
            role: "ADMIN",
          })
        );
      });
      return res.json({ error: true });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    // '/edit/:id'
    try {
      const id = req.params.id;
      const { email, password, role } = req.body;

      if(password) {
        const hashPassword = await bcrypt.hash(password, 5);
        await User.findOne({ where: { id } }).then(async (result) => {
          return res.json(
            await result.update({
              email,
              password: hashPassword,
              role,
            })
          );
        });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
      } else {
        await User.findOne({ where: { id } }).then(async (result) => {
          return res.json(
            await result.update({
              email,
              role
            })
          );
        });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
      }
      


    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteUser(req, res, next) {
    // '/delete'

    try {
      const id = req.params.id;

      if (id) {
        const candidate = await User.destroy({
          where: {
            id: id,
          },
        });

        if (candidate) {
          return res.json(`User with id ${id} was deleted`);
        } else {
          return res.json(`User with id ${id} not found`);
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async howManyU(req, res, next) {
    // '/dashboard  //admin only

    try {
      const userCount = await User.count({});
      const profileCount = await Profile.count({});
      const oldPeople = await Profile.count({
        where: {
          fullYears: {
            [Op.gte]: 18,
          },
        },
      });

      const dash = { userCount, profileCount, oldPeople };

      return res.json(dash);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
