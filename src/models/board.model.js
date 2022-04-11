import Joi from 'joi'
import { getDB } from '*/config/configuration'

/**
 * !Define board collections
 */

const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(1).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

/**
 * !validate data
 */

const ValidateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

/**
 * !API Create new board
 * @param {*} data
 * @returns {*} result
 */
const createNew = async (data) => {
  try {
    const value = await ValidateSchema(data)
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value)
    const getResult = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: result.insertedId })
    return getResult
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew }
