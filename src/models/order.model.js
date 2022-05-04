import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { UserModel } from '*/models/user.model'
import { getDB } from '*/config/configuration'
import { genToken } from '*/utils/generationToken'
import { env } from '*/config/environment'
import { emailType } from '*/mail/mail.type'
import { transport } from '*/mail/mail.config'

/**
 * !Define order collections
 */

const orderCollectionName = 'orders'

const orderCollectionSchema = Joi.object({
  orderId: Joi.string().required().min(1).trim(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  user: Joi.string(),
  plan: Joi.string(),
  amount: Joi.object({
    currency_code: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }),
  status: Joi.string(),
  createdOrderAt: Joi.date().timestamp().default(Date.now()),
  payee: Joi.object({
    email_address: Joi.string().optional().allow(''),
    merchant_id: Joi.string().optional().allow('')
  }),
  metadata: Joi.array().items({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }),
  private_metadata: Joi.array().items({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  })
})

/**
 * !validate data
 */

const ValidateSchema = async (data) => {
  return await orderCollectionSchema.validateAsync(data, { abortEarly: false })
}

/**
 * !API Create new order
 * @param {*} data
 * @returns
 */
const createNew = async (data, user) => {
  try {
    const value = await ValidateSchema(data)
    const insertValue = {
      ...value,
      user: ObjectId(data.user)
    }
    const result = await getDB()
      .collection(orderCollectionName)
      .insertOne(insertValue)
    const getResult = await getDB()
      .collection(orderCollectionName)
      .findOne({ _id: result.insertedId })
    /**
     * !Send mail
     */
    const configMailOption = transport.mailOptions(
      user.email,
      emailType.BUY_SUCCESS
    )
    transport.transporter.sendMail(configMailOption, (err, data) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        console.log('Email sent')
      }
    })

    return getResult
  } catch (error) {
    throw new Error(error)
  }
}

export const OrderModel = { createNew }