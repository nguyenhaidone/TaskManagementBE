import Joi from 'joi'
import { ObjectId } from 'mongodb'
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
 * @param {object} data
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

/**
 * !API Update columns order board
 * @param {string} boardId
 * @param {string} columnId
 * @returns {*} result
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * !API Get full board
 * @param {string} id
 * @returns {*} result
 */
const getFullBoard = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(id), _destroy: false } },
        // { $addFields: { _idSample: { $toString: "$_id" } } },
        {
          $lookup: {
            from: 'columns',
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: 'cards',
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = {
  boardCollectionName,
  createNew,
  getFullBoard,
  pushColumnOrder
}
