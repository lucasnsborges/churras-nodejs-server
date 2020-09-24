import { Router } from 'express'
import { login } from './controller'
import { password } from '../../services/passport'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiHeader {String} username User email
 * @apiHeader {String} password User password
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiSuccess (Success 200) {Object} token Authentication token
 */
router.post('/', password(), login)

export default router
