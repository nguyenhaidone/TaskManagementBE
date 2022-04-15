import bcrypt from 'bcrypt'
import { env } from '*/config/environment'

const SALT = parseInt(env.SALT_ROUNDS, 10)

const hashPassword = (password) => {
  return bcrypt.hashSync(password, SALT)
}

const encryptPassword = (loginPassword, userPassword) => {
  return bcrypt.compareSync(loginPassword, userPassword)
}

export const hash = { hashPassword, encryptPassword }
