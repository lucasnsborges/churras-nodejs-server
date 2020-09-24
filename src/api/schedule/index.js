import { Router } from 'express'
import { token } from '../../services/passport'
import {
  get,
  create,
  addGuest,
  updateGuest,
  disableGuest
} from './controller'

const router = new Router()

/**
 * @api {get} /schedule Get schedules
 * @apiName Get schedules
 * @apiGroup Schedules
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiSuccess {ObjectId} id Schedule identifier
 * @apiSuccess {ObjectId} createdBy Identifier of the user who created the schedule
 * @apiSuccess {String} description Scheduling description
 * @apiSuccess {Array} guests List of guests
 * @apiSuccess {Date} date Scheduling date
 * @apiSuccess {Date} createdAt Schedule creation date
 * @apiSuccess {Date} updatedAt Schedule update date
 */
router.get('/', token({ required: true }), get)

/**
 * @api {post} /schedule Create schedule
 * @apiName Create schedule
 * @apiGroup Schedules
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiParam (Request body) {Date} date Date the event will take place
 * @apiParam (Request body) {String} description Schedule description
 * @apiParam (Request body) {Number} suggestedAmount Standard guest contribution
 * @apiSuccess {ObjectId} id Schedule identifier
 * @apiSuccess {ObjectId} createdBy Identifier of the user who created the schedule
 * @apiSuccess {String} description Scheduling description
 * @apiSuccess {Array} guests List of guests
 * @apiSuccess {Date} date Scheduling date
 * @apiSuccess {Date} createdAt Schedule creation date
 * @apiSuccess {Date} updatedAt Schedule update date
 */
router.post('/', token({ required: true }), create)

/**
 * @api {post} /schedule/:id/guests Add guest
 * @apiName AddGuest
 * @apiGroup Guest
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiParam {String} id Schedule identifier
 * @apiParam (Request body) {String} name Guest name
 * @apiParam (Request body) {String} amount Suggested contribution amount for the guest
 * @apiSuccess (Sucess 201) {Boolean} added Parameter if the guest has been added
 * @apiError 400 unable to add guest
 */
router.post('/:id/guests', token({ required: true }), addGuest)

/**
 * @api {put} /schedule/:id/guests/:guestId Update guest
 * @apiName UpdateGuest
 * @apiGroup Guest
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiParam {String} id Schedule identifier
 * @apiParam {String} guestId Guest identifier
 * @apiParam (Request body) {Number} amount Suggested contribution amount for the guest (optional)
 * @apiParam (Request body) {Boolean} contributed If the guest contributed (optional)
 * @apiSuccess (Sucess 200) {Boolean} updated Parameter if the guest has been updated
 * @apiError 400 unable update suggested amount guest
 */
router.put('/:id/guests/:guestId', token({ required: true }), updateGuest)

/**
 * @api {delete} /schedule/:id/guests/:guestId Remove guest
 * @apiName RemoveGuest
 * @apiGroup Guest
 * @apiHeader {String} Authorization `Bearer ${token}`
 * @apiParam {String} id Schedule identifier
 * @apiParam {String} guestId Guest identifier
 * @apiSuccess (Sucess 200) {Boolean} removed Parameter if the guest has been removed
 * @apiError 400 unable at remove guest
 */
router.delete('/:id/guests/:guestId', token({ required: true }), disableGuest)


export default router
