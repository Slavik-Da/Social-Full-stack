const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMidlleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMidlleware, userController.check);
router.put("/boost/:id", checkRole("ADMIN"), userController.boost);
router.put("/edit/:id", checkRole("ADMIN"), userController.edit);
router.get("/dashboard", checkRole("ADMIN"), userController.howManyU);

module.exports = router;
