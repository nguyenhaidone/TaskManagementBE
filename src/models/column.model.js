import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/configuration'
import { CardModel } from '*/models/card.model'

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
    const insertValue = {
      ...value,
      boardId: ObjectId(value.boardId)
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue)
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
    const updatedBoard = {
      ...data,
      boardId: ObjectId(data.boardId)
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedBoard },
        { returnDocument: 'after' }
      )
    if (result.value._destroy) {
      CardModel.updateCards(result.value.cardOrder)
    }
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * !API Update cards order in column
 * @param {string} cardId
 * @param {string} columnId
 * @returns {*} result
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  pushCardOrder
}
