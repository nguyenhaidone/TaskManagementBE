import express from 'express'
import { AuthController } from '*/controllers/auth.controller'
import { AuthValidations } from '*/validations/auth.validation'
import { AuthMiddleware } from '*/middlewares/auth.middleware'

const router = express.Router()

router
  .route('/register')
  .post(AuthValidations.register, AuthController.register)

router.route('/login').post(AuthValidations.login, AuthController.login)

router.route('/social-login').post(AuthController.socialLogin)

router.route('/refresh-token').post(AuthController.refreshToken)

router.route('/verify-code').post(AuthController.sendVerifyCode)

router
  .route('/update-user-info')
  .put(AuthMiddleware.isAuth, AuthController.updateUserInformation)

router
  .route('/user-detail/:email')
  .get(AuthMiddleware.isAuth, AuthController.userDetail)

router
  .route('/current-user-detail')
  .get(AuthMiddleware.isAuth, AuthController.userDetail)

export const authRoute = router
