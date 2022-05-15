import { UserModel } from '*/models/user.model'
import { hash } from '*/utils/hashPassword'
import { env } from '*/config/environment'
import { genToken } from '*/utils/generationToken'
import { authDto } from '*/utils/dtos/auth.dto'

const registerNewAccount = async (data) => {
  try {
    data.password = hash.hashPassword(data.password)
    const result = await UserModel.registerNewAccount(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const registerSocialAccount = async (data) => {
  try {
    data.password = hash.hashPassword(data.password)
    const result = await UserModel.registerSocialAccount(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const loginAccount = async (data) => {
  try {
    // console.log(data);
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
const getUserDetailService = async (userEmail, accessTokenFromHeader) => {
  try {
    // const findUserEmail = async () => {
    if (userEmail) {
      const result = await UserModel.getCurrentUser(userEmail)
      const dataResponse = authDto.userDetailConvert(result)
      // console.log(dataResponse);
      return dataResponse
    } else {
      const decoded = await genToken.decodeToken(
        accessTokenFromHeader,
        env.ACCESS_TOKEN_SECRET
      )

      const result = await UserModel.getCurrentUser(decoded.payload.email)
      const dataResponse = authDto.userDetailConvert(result)
      // console.log(dataResponse);
      return dataResponse
    }
    // };
    // const email = findUserEmail();
  } catch (error) {
    throw new Error(error)
  }
}

const socialLoginService = async (data) => {
  try {
    const checkExistsUser = await UserModel.getCurrentUser(data.email)
    if (checkExistsUser) {
      const loginSocial = await loginAccount(data)
      return loginSocial
    } else {
      const registerSocial = await registerSocialAccount(data)
      return registerSocial
    }
  } catch (error) {
    throw new Error(error)
  }
}

const sendVerifyCodeService = async (email, verifyCode) => {
  try {
    console.log(verifyCode)
    const checkVerifyCode = await UserModel.checkVerifyCode(email, verifyCode)
    return checkVerifyCode
  } catch (error) {
    throw new Error(error)
  }
}

const updateUserInfoService = async (curUser, data) => {
  try {
    console.log(curUser)
    console.log(data)
    if (curUser) {
      const userInfoUpdate = await UserModel.updateInfoUser(curUser, data)
      return userInfoUpdate
    } else {
      return 'User not found'
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const AuthServices = {
  registerNewAccount,
  loginAccount,
  refreshToken,
  socialLoginService,
  getUserDetailService,
  sendVerifyCodeService,
  updateUserInfoService
}
