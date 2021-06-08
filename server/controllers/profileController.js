const { Profile, User } = require("../models/models");
const ApiError = require("../error/apiError");
const { Op } = require("sequelize");

class ProfileController {
  async create(req, res, next) {
    // '/create'

    try {
      const userId = req.user.id;
      const { name, gender, fullYears, city } = req.body;
      const profile = await Profile.create({
        name,
        gender,
        fullYears,
        city,
        userId,
      });
      return res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    // '/getall'     admin only, with filters

    try {
      let { fullYears, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit; //pagination logic

      let profiles;

      if (fullYears) {
        profiles = await Profile.findAll({
          where: { fullYears },
          limit,
          offset,
        }); // filter profiles by fullYrs
      } else {
        profiles = await Profile.findAll({ limit, offset }); // pagination only
      }
      return res.json(profiles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      let profiles;
      if (id) {
        profiles = await Profile.findAll({ where: { userId: id } });
      }
      return res.json(profiles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res, next) {
    //  '/curr' profiles of current user ????

    try {
      const id = req.user.id;
      let profiles;
      if (id) {
        profiles = await Profile.findAll({ where: { userId: id } });
      }
      return res.json(profiles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    // '/edit/:id'
    try {
      const userId = req.user.id;
      const id = req.params.id;
      const { name, gender, fullYears, city } = req.body;

      if (userId) {
        const succes = await Profile.findOne({
          where: { userId: userId, id: id },
        }).then(async (result) => {
          return res.json(
            await result.update({
              name,
              gender,
              fullYears,
              city,
            })
          );
        });
        if (succes) {
          return res.json(`Profile with id ${id} was edited`);
        } else {
          return res.json(`Profile with id ${id} not found`);
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async editAdmin(req, res, next) {
    try {
      const id = req.params.id;
      const { name, gender, fullYears, city } = req.body;

      if (id) {
        const succes = await Profile.findOne({
          where: { id: id },
        }).then(async (result) => {
          return res.json(
            await result.update({
              name,
              gender,
              fullYears,
              city,
            })
          );
        });
        if (succes) {
          return res.json(`Profile with id ${id} was edited`);
        } else {
          return res.json(`Profile with id ${id} not found`);
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    // '/delete/'
    try {
      const userId = req.user.id;
      const id = req.params.id;

      if (userId) {
        const candidate = await Profile.destroy({
          where: {
            userId: userId,
            id: id,
          },
        });

        if (candidate) {
          return res.json(`Profile with id ${id} was deleted`);
        } else {
          return res.json(`Profile with id ${id} not found`);
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteAdmin(req, res, next) {
    // '/delete/:id'  //admin only
    const id = req.params.id;
    try {
      const candidate = await Profile.destroy({
        where: {
          id: id,
        },
      });
      if (candidate) {
        return res.json(`Profile with id ${id} was deleted`);
      } else {
        return res.json(`Profile with id ${id} not found`);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async howManyP(req, res, next) {
    // '/dashp'  //admin only

    try {
      const count = await Profile.count({});

      return res.json(count);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async howMany18(req, res, next) {
    // '/dash18'
    try {
      const a = await Profile.count({
        where: {
          fullYears: {
            [Op.gte]: 18,
          },
        },
      });
      return res.json(a);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProfileController();
