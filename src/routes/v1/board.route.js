import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidations } from '*/validations/board.validation'
import { AuthMiddleware } from '*/middlewares/auth.middleware'
import { BoardMiddleware } from '*/middlewares/board.middleware'

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
  .get(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.getFullBoard
  )
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.update
  )

router
  .route('/add-new-user/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.addNewPeopleController
  )

export const boardRoute = router
