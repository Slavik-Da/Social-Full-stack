const Router = require("express");
const router = new Router();
const profileController = require("../controllers/profileController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMidlleware = require("../middleware/authMiddleware");

router.post("/create", authMidlleware, profileController.create); // add new profile
router.put("/edit/:id", checkRole("ADMIN"), profileController.editAdmin);
router.get("/getall", checkRole("ADMIN"), profileController.getAll); // get all profiles FOR ADMIN
router.get("/:id", checkRole("ADMIN"), profileController.getById); // get profiles for ADMIN
router.put("/edit/:id", authMidlleware, profileController.edit); // edit profile info
router.get("/", authMidlleware, profileController.get); //get all profiles of current user ?????
//router.get("/dash18", checkRole("ADMIN"), profileController.howMany18); //??????????????????????????????????????


router.delete("/delete/:id", checkRole("ADMIN"), profileController.deleteAdmin); // profile delete
router.delete("/delete/:id", authMidlleware, profileController.delete); // profile delete

module.exports = router;
