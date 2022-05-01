import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidations } from '*/validations/board.validation'
import { AuthMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router
  .route('/')
  .get(AuthMiddleware.isAuth, BoardController.getListBoardByUserIdController)
  .post(
    AuthMiddleware.isAuth,
    BoardValidations.createNew,
    BoardController.createNew
  )

router
  .route('/:id')
  .get(AuthMiddleware.isAuth, BoardController.getFullBoard)
  .put(AuthMiddleware.isAuth, BoardController.update)

export const boardRoute = router
