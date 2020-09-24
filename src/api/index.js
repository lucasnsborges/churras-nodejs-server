import { Router } from 'express'

import user from './user'
import auth from './auth'
import schedule from './schedule'

const router = new Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/schedule', schedule)

export default router
