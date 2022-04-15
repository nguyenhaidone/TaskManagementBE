import express from 'express'
import { ColumnController } from '*/controllers/column.controller'
import { ColumnValidations } from '*/validations/column.validation'
import { AuthMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.isAuth,
    ColumnValidations.createNew,
    ColumnController.createNew
  )

router
  .route('/:id')
  .put(
    AuthMiddleware.isAuth,
    ColumnValidations.update,
    ColumnController.update
  )

export const columnRoute = router
