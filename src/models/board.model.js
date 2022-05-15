import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { UserModel } from '*/models/user.model'
import { getDB } from '*/config/configuration'
import { genToken } from '*/utils/generationToken'
import { env } from '*/config/environment'

/**
 * !Define board collections
 */

const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(1).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  creater: Joi.string(),
  members: Joi.array().default([]),
  boardBackgroundColor: Joi.string().default('#ffffff'),
  metadata: Joi.object({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }).default([{ key: '', value: '' }]),
  private_metadata: Joi.object({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }).default([{ key: '', value: '' }])
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
    // console.log(data);
    const validUser = await UserModel.getCurrentUser(data.creater)
    if (validUser) {
      const insertValue = {
        ...value,
        creater: ObjectId(validUser._id)
      }
      // console.log(insertValue);
      const result = await getDB()
        .collection(boardCollectionName)
        .insertOne(insertValue)
      const getResult = await getDB()
        .collection(boardCollectionName)
        .findOne({ _id: result.insertedId })
      return getResult
    } else return 'User not exist'
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

/**
 * !API update board
 * @param {string} id
 * @returns {*} result
 */
const update = async (id, data) => {
  try {
    const updatedBoard = { ...data }
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedBoard },
        { returnDocument: 'after' }
      )
    // if (result.value._destroy) {
    //   CardModel.updateCards(result.value.cardOrder)
    // }
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * !API get list board by user id
 * @param {string} id
 * @returns {*} result
 */
const getListBoardByUser = async (accessTokenFromHeader) => {
  try {
    const decoded = await genToken.decodeToken(
      accessTokenFromHeader,
      env.ACCESS_TOKEN_SECRET
    )
    if (!decoded) {
      throw 'Access token invaild.'
    }
    const email = decoded.payload.email
    const validUser = await UserModel.getCurrentUser(email)
    if (validUser) {
      const result = await getDB()
        .collection(boardCollectionName)
        .find({ creater: validUser._id })
        .toArray()
      return result
    } else return 'User not exist'
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = {
  boardCollectionName,
  createNew,
  getFullBoard,
  pushColumnOrder,
  update,
  getListBoardByUser
}
