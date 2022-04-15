import express from 'express'
import { CardController } from '*/controllers/card.controller'
import { CardValidations } from '*/validations/card.validation'
import { AuthMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.isAuth,
    CardValidations.createNew,
    CardController.createNew
  )

router
  .route('/:id')
  .put(AuthMiddleware.isAuth, CardValidations.update, CardController.update)

export const cardRoute = router
