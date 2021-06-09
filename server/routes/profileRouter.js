const Router = require("express");
const router = new Router();
const profileController = require("../controllers/profileController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMidlleware = require("../middleware/authMiddleware");

router.post("/create", authMidlleware, profileController.create); // add new profile

router.get("/", authMidlleware, profileController.get); //get all profiles for current USER

router.delete("/delete/:id", authMidlleware, profileController.delete); // profile delete

router.put("/edit/:id", authMidlleware, profileController.edit); // edit profile info
router.put("/edit/:id", checkRole("ADMIN"), profileController.editAdmin);
router.get("/getall", checkRole("ADMIN"), profileController.getAll); // get all profiles FOR ADMIN
router.delete("/delete/:id", checkRole("ADMIN"), profileController.deleteAdmin); // profile delete
router.get("/:id", checkRole("ADMIN"), profileController.getById); // get profiles for ADMIN ----

module.exports = router;
