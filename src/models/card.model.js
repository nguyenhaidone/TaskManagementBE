import Joi from 'joi'
import { getDB } from '*/config/configuration'

/**
 * !Define card collections
 */

const cardCollectionName = 'cards'

const cardCollectionSchema = Joi.object({
  title: Joi.string().required().min(2).max(20),
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  cover: Joi.string().default(null)
})

/**
 * !validate data
 */

const ValidateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

/**
 * !API Create new card
 * @param {*} data
 * @returns
 */
const createNew = async (data) => {
  try {
    const value = await ValidateSchema(data)
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value)
    const getResult = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: result.insertedId })
    return getResult
  } catch (error) {
    console.log(error)
  }
}

export const CardModel = { createNew }
