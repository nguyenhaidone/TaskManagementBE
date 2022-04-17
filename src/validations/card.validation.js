import Joi from 'joi'
import { httpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
  const conditions = Joi.object({
    title: Joi.string().required().min(1).max(20),
    boardId: Joi.string().required().min(3).trim(),
    columnId: Joi.string().required().min(3).trim()
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

const update = async (req, res, next) => {
  const conditions = Joi.object({
    boardId: Joi.string().required().min(3).trim(),
    columnId: Joi.string().required().min(3).trim()
  })
  try {
    await conditions.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (e) {
    res
      .status(httpStatusCode.BAD_REQUEST)
      .send({ error: new Error(e).message })
  }
}

export const CardValidations = { createNew, update }
