import express from 'express'
import { CardController } from '*/controllers/card.controller'
import { CardValidations } from '*/validations/card.validation'

const router = express.Router()

router.route('/').post(CardValidations.createNew, CardController.createNew)

router.route('/:id').put(CardValidations.update, CardController.update)

export const cardRoute = router
