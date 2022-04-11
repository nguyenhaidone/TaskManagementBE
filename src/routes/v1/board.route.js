import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidations } from '*/validations/board.validation'

const router = express.Router()

router
  .route('/')
  //   .get((req, res) => {
  //     console.log("Get post");
  //   })
  .post(BoardValidations.createNew, BoardController.createNew)

router.route('/:id').get(BoardController.getFullBoard)

export const boardRoute = router
