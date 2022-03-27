import Joi from 'joi'
import { getDB } from '*/config/configuration'

/**
 * !Define column collections
 */

const columnCollectionName = 'columns'

const columnCollectionSchema = Joi.object({
  title: Joi.string().required().min(2).max(20),
  boardId: Joi.string().required(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

/**
 * !validate data
 */

const ValidateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

/**
 * !API Create new column
 * @param {*} data
 * @returns
 */
const createNew = async (data) => {
  try {
    const value = await ValidateSchema(data)
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value)
    const getResult = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: result.insertedId })
    return getResult
  } catch (error) {
    console.log(error)
  }
}

export const ColumnModel = { createNew }
