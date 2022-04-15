import { AuthServices } from '*/services/auth.service'
import { httpStatusCode } from '*/utils/constants'
import { responseMessage } from '*/utils/common'
import { authDto } from '*/utils/dtos/auth.dto'

const register = async (req, res) => {
  try {
    const registerDto = authDto.registerDto(req.body)
    const result = await AuthServices.registerNewAccount(registerDto)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    console.log(req.body)
    const loginDto = authDto.loginDto(req.body)
    const result = await AuthServices.loginAccount(loginDto)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    console.log(error)
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const socialLogin = async (req, res) => {
  try {
    console.log(req.body)
    const socialLoginDto = authDto.registerDto(req.body)
    const result = await AuthServices.socialLoginService(socialLoginDto)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    console.log(error)
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const refreshToken = async (req, res) => {
  try {
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
      return res.status(400).send('Access token not exist.')
    }

    const refreshTokenFromBody = req.body.refreshToken
    if (!refreshTokenFromBody) {
      return res.status(400).send('Không tìm thấy refresh token.')
    }

    const result = await AuthServices.refreshToken(
      accessTokenFromHeader,
      refreshTokenFromBody
    )
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const AuthController = { register, login, refreshToken, socialLogin }
