import express from 'express'
import { ColumnController } from '*/controllers/column.controller'
import { ColumnValidations } from '*/validations/column.validation'

const router = express.Router()

router.route('/').post(ColumnValidations.createNew, ColumnController.createNew)

router.route('/:id').put(ColumnValidations.update, ColumnController.update)

export const columnRoute = router
