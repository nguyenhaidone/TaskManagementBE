import express from 'express'
import { httpStatusCode } from '*/utils/constants'
import { boardRoute } from './board.route'

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

export const api = router
