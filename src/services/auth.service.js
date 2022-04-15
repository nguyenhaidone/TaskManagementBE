import { UserModel } from '*/models/user.model'
import { hash } from '*/utils/hashPassword'

const registerNewAccount = async (data) => {
  try {
    data.password = hash.hashPassword(data.password)
    const result = await UserModel.registerNewAccount(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const loginAccount = async (data) => {
  try {
    console.log(data)
    const result = await UserModel.loginAccount(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const refreshToken = async (accessTokenFromHeader, refreshTokenFromBody) => {
  try {
    console.log(accessTokenFromHeader, refreshTokenFromBody)
    const result = await UserModel.refreshToken(
      accessTokenFromHeader,
      refreshTokenFromBody
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const socialLoginService = async (data) => {
  try {
    console.log(data)
    const checkExistsUser = await UserModel.getCurrentUser(data.email)
    if (checkExistsUser) {
      const loginSocial = await loginAccount(data)
      return loginSocial
    } else {
      const registerSocial = await registerNewAccount(data)
      return registerSocial
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const AuthServices = {
  registerNewAccount,
  loginAccount,
  refreshToken,
  socialLoginService
}
