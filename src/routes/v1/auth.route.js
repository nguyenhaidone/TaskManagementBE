import express from 'express'
import { AuthController } from '*/controllers/auth.controller'
import { AuthValidations } from '*/validations/auth.validation'

const router = express.Router()

router
  .route('/register')
  .post(AuthValidations.register, AuthController.register)

router.route('/login').post(AuthValidations.login, AuthController.login)

router.route('/social-login').post(AuthController.socialLogin)

router.route('/refresh-token').post(AuthController.refreshToken)

export const authRoute = router
