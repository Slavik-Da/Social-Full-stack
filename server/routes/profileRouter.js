const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMidlleware = require('../middleware/authMiddleware')


router.post('/create', authMidlleware, profileController.create) // add new profile
router.put('/edit/:id', authMidlleware,  profileController.edit) // edit profile info
router.put('/editadmin/:id',  checkRole('ADMIN'),  profileController.editAdmin)
router.get('/dash18', checkRole('ADMIN'),profileController.howMany18 ) //??????????????????????????????????????
// router.get('/dashp', checkRole('ADMIN'),profileController.howManyP ) //how many Profiles

router.get('/getall', checkRole('ADMIN'), profileController.getAll) // get all profiles FOR ADMIN
router.get('/curr', authMidlleware, profileController.get) //get all profiles of current user ?????

router.delete('/delete/:id', authMidlleware, profileController.delete) // profile delete
router.delete('/deleteadmin/:id', checkRole('ADMIN'), profileController.deleteAdmin) // profile delete


module.exports = router