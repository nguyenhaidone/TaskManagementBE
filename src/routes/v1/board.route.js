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
  .route('/get-list-board-joined-by-current-user')
  .get(
    AuthMiddleware.isAuth,
    BoardController.getListBoardJoinedOfCurrentUserController
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

router
  .route('/message/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.boardMessageController
  )

router
  .route('/remove-current-user/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.removeCurrentUserController
  )

router
  .route('/remove-current-user-by-creater/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.removeMemberUserByCreateController
  )

router
  .route('/add-new-user-to-blackList/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.addNewPeopleToBlackListController
  )

router
  .route('/remove-user-from-blackList/:id')
  .put(
    AuthMiddleware.isAuth,
    BoardMiddleware.isAccessBoard,
    BoardController.removePeopleFromBlackListController
  )

export const boardRoute = router
