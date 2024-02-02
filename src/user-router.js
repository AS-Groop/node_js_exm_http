const Router = require("../framework/Router");
const {getUsersControl, postUsersControl} = require("./user-control");
const router = new Router()

router.get('/users', getUsersControl)
router.post('/users', postUsersControl)

module.exports = router