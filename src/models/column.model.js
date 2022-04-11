import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/configuration'

/**
 * !Define column collections
 */

const columnCollectionName = 'columns'

const columnCollectionSchema = Joi.object({
  title: Joi.string().required().min(2).max(20).trim(),
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
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false
  })
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
    throw new Error(error)
  }
}

/**
 * !API Update column
 * @param {*} data
 * @returns
 */
const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      )
    console.log(result)
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = { createNew, update }
