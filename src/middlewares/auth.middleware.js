import { UserModel } from '*/models/user.model'
import { genToken } from '*/utils/generationToken'
import { env } from '*/config/environment'

const isAuth = async (req, res, next) => {
  const accessTokenFromHeader = req.headers.x_authorization
  if (!accessTokenFromHeader) {
    return res.status(401).send('Access token not exist!')
  }

  const accessTokenSecret = env.ACCESS_TOKEN_SECRET

  const verified = await genToken.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  )
  if (!verified) {
    return res.status(403).send('Forbidden!')
  }

  const user = await UserModel.getCurrentUser(verified.payload.email)
  req.user = user

  return next()
}

export const AuthMiddleware = { isAuth }
