import express from 'express'
import { httpStatusCode } from '*/utils/constants'
import { boardRoute } from './board.route'
import { columnRoute } from './column.route'
import { cardRoute } from './card.route'
import { authRoute } from './auth.route'

const router = express.Router()

/**
 * !API GET /status
 */
router.get('/status', (req, res) =>
  res.status(httpStatusCode.OK).json({
    status: 'OK'
  })
)

/**
 * !Board Apis
 */
router.use('/boards', boardRoute)

/**
 * !Column Apis
 */
router.use('/columns', columnRoute)

/**
 * !Card Apis
 */
router.use('/cards', cardRoute)

/**
 * !Register Apis
 */
router.use('/auth', authRoute)

export const api = router
