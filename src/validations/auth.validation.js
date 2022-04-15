import Joi from 'joi'
import { httpStatusCode } from '*/utils/constants'

const register = async (req, res, next) => {
  const conditions = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required().min(6),
    fullname: Joi.string().required().min(1),
    isActive: Joi.boolean().required()
  })
  try {
    await conditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (e) {
    res
      .status(httpStatusCode.BAD_REQUEST)
      .send({ error: new Error(e).message })
  }
}

const login = async (req, res, next) => {
  const conditions = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required().min(6)
  })
  try {
    await conditions.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (e) {
    res
      .status(httpStatusCode.BAD_REQUEST)
      .send({ error: new Error(e).message })
  }
}

export const AuthValidations = { register, login }
