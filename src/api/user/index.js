import { Router } from 'express'
import { token } from '../../services/passport'
import { getCurrentUser, create } from './controller'

const router = new Router()

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiSuccess {ObjectId} id User identifier
 * @apiSuccess {email} email User email address
 * @apiSuccess {Date} createdAt User creation date
 */
router.get('/me', token({ required: true }), getCurrentUser)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam (Request body) {String} email Valid email address
 * @apiParam (Request body) {String} password Password longer than 6 characters
 * @apiSuccess {ObjectId} id User identifier
 * @apiSuccess {email} email User email address
 * @apiSuccess {Date} createdAt User creation date
 * @apiError 409 Email already registered.
 */
router.post('/', create)


export default router
