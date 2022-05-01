import { BoardServices } from '*/services/board.service'
import { httpStatusCode } from '*/utils/constants'
import { responseMessage } from '*/utils/common'

const createNew = async (req, res) => {
  try {
    const result = await BoardServices.createNew(req.body)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const getFullBoard = async (req, res) => {
  try {
    const { id } = await req.params
    const result = await BoardServices.getFullBoard(id)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = await req.params
    const result = await BoardServices.update(id, req.body)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const getListBoardByUserIdController = async (req, res) => {
  try {
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
      return res.status(400).send('Access token not exist.')
    }
    const result = await BoardServices.getListBoardByUserIdService(
      accessTokenFromHeader
    )
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const BoardController = {
  createNew,
  getFullBoard,
  update,
  getListBoardByUserIdController
}
