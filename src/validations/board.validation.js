import Joi from 'joi'
import { httpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
  const conditions = Joi.object({
    title: Joi.string().required().min(1).max(20),
    creater: Joi.string().min(1)
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

export const BoardValidations = { createNew }
