import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/configuration'

/**
 * !Define card collections
 */

const cardCollectionName = 'cards'

const cardCollectionSchema = Joi.object({
  title: Joi.string().required().min(2).max(20).trim(),
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
    const insertValue = {
      ...value,
      boardId: ObjectId(value.boardId),
      columnId: ObjectId(value.columnId)
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue)
    const getResult = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: result.insertedId })
    return getResult
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * !API Update new card
 * @param {*} data
 * @returns
 */
const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { cardCollectionName, createNew, update }
