import Joi from 'joi'
import randToken from 'rand-token'
import { ObjectId } from 'mongodb'
import { env } from '*/config/environment'
import { getDB } from '*/config/configuration'
import { hash } from '*/utils/hashPassword'
import { genToken } from '*/utils/generationToken'

/**
 * !Define board collections
 */

const userCollectionName = 'users'

const userCollectionSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required().min(6),
  fullname: Joi.string().min(1),
  address: Joi.string().optional().allow(''),
  avatar: Joi.string().optional().allow(''),
  phoneNumber: Joi.string().optional().allow(''),
  dateOfBirth: Joi.date().optional().default(Date.now()),
  createdAt: Joi.date().timestamp().default(Date.now()),
  plan: Joi.string(),
  permission: Joi.string(),
  metadata: Joi.object({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }),
  private_metadata: Joi.object({
    key: Joi.string().optional().allow(''),
    value: Joi.string().optional().allow('')
  }),
  isActive: Joi.boolean(),
  refreshToken: Joi.string().optional().allow('')
})

/**
 * !validate data
 */

const ValidateSchema = async (data) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

/**
 * !API Register new account
 * @param {object} data
 * @returns {*} result
 */
const registerNewAccount = async (data) => {
  try {
    const findExistingAccount = await getDB()
      .collection(userCollectionName)
      .findOne({ email: data.email })
    if (findExistingAccount) {
      throw 'Account already exist!'
    } else {
      const newAccount = await getDB()
        .collection(userCollectionName)
        .insertOne(data)
      const getResult = await getDB()
        .collection(userCollectionName)
        .findOne({ _id: newAccount.insertedId })
      return getResult
    }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * !API Update refresh token
 * @param {object} data
 * @returns {*} result
 */
const updateRefreshToken = async (userId, refreshToken) => {
  try {
    await getDB()
      .collection(userCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { refreshToken: refreshToken } },
        { returnDocument: 'after' }
      )
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * !API Login account
 * @param {object} data
 * @returns {*} result
 */
const loginAccount = async (data) => {
  try {
    const findExistingAccount = await getDB()
      .collection(userCollectionName)
      .findOne({ email: data.email })
    /**
     * *Check match email and password
     */
    if (!findExistingAccount) {
      return 'Account have not already exist!'
    }
    const verifyPassword = hash.encryptPassword(
      data.password,
      findExistingAccount.password
    )
    if (!verifyPassword) return 'Password do not match'
    /**
     * ?Generation access token and refresh token
     */
    const accessTokenLife = env.ACCESS_TOKEN_LIFE
    const accessTokenSecret = env.ACCESS_TOKEN_SECRET

    const dataForAccessToken = {
      email: findExistingAccount.email,
      fullname: findExistingAccount.fullname
    }

    const accessToken = await genToken.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    )

    if (!accessToken) {
      return 'Login not successfully, please try again.'
    }
    /**
     * !create random refesh token
     */
    let refreshToken = randToken.generate(parseInt(env.REFRESH_TOKEN_SIZE, 10))

    if (!findExistingAccount.refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await updateRefreshToken(findExistingAccount._id, refreshToken)
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = findExistingAccount.refreshToken
    }
    return {
      message: 'Login successfully!',
      accessToken,
      refreshToken,
      user: findExistingAccount
    }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * !API refresh token
 * @param {object} data
 * @returns {*} result
 */
const refreshToken = async (accessTokenFromHeader, refreshTokenFromBody) => {
  try {
    const decoded = await genToken.decodeToken(
      accessTokenFromHeader,
      env.ACCESS_TOKEN_SECRET
    )
    if (!decoded) {
      throw 'Access token invaild.'
    }
    const email = decoded.payload.email
    const user = await await getDB()
      .collection(userCollectionName)
      .findOne({ email: email })
    if (!user) {
      return 'User not exist.'
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      return 'Refresh token invaild'
    }
    /**
     * * Create new refresh token
     */
    const accessTokenLife = env.ACCESS_TOKEN_LIFE
    const accessTokenSecret = env.ACCESS_TOKEN_SECRET
    const dataForAccessToken = {
      fullname: user.fullname,
      email: user.email
    }

    const accessToken = await genToken.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    )

    if (!accessToken) {
      return 'create access token fail, please try again'
    }
    return accessToken
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * !API get current user
 * @param {object} data
 * @returns {*} result
 */
const getCurrentUser = async (email) => {
  try {
    // if (email) {
    const user = await getDB()
      .collection(userCollectionName)
      .findOne({ email: email })
    return user
    // }

    // if (phoneNumber) {
    //   const user = await getDB()
    //     .collection(userCollectionName)
    //     .findOne({ phoneNumber: phoneNumber })
    //   return user ? user : 'User not exist'
    // }
  } catch (error) {
    throw new Error(error)
  }
}

export const UserModel = {
  registerNewAccount,
  loginAccount,
  refreshToken,
  getCurrentUser
}