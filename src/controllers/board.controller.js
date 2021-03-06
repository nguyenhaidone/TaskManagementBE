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

const addNewPeopleController = async (req, res) => {
  try {
    const boardId = req.params
    const email = req.body.email
    const data = { userEmail: email, boardId: boardId.id }
    const user = req.user
    const result = await BoardServices.addNewPeopleService(user, data)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const getListBoardJoinedOfCurrentUserController = async (req, res) => {
  try {
    const curUser = req.user
    const result = await BoardServices.listBoardJoinedByCurrentUserService(
      curUser
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

export const boardMessageController = async (req, res) => {
  try {
    const boardId = req.params.id
    const { message } = req.body
    const result = await BoardServices.boardMessageService(boardId, message)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const removeCurrentUserController = async (req, res) => {
  try {
    const boardId = req.params.id
    console.log(boardId)
    console.log(req.user)
    const result = await BoardServices.removeCurrentUserService(
      boardId,
      req.user
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

export const removeMemberUserByCreateController = async (req, res) => {
  try {
    const boardId = req.params.id
    const { member } = req.body
    const result = await BoardServices.removeMemberUserByCreateService(
      boardId,
      req.user,
      member
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

const addNewPeopleToBlackListController = async (req, res) => {
  try {
    const boardId = req.params
    const email = req.body.email
    const data = { userEmail: email, boardId: boardId.id }
    const result = await BoardServices.addNewPeopleToBlackListService(data)
    console.log(result)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

const removePeopleFromBlackListController = async (req, res) => {
  try {
    const boardId = req.params
    const email = req.body.email
    const data = { userEmail: email, boardId: boardId.id }
    const result = await BoardServices.removePeopleFromBlackListService(data)
    console.log(result)
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
  getListBoardByUserIdController,
  addNewPeopleController,
  getListBoardJoinedOfCurrentUserController,
  boardMessageController,
  removeCurrentUserController,
  removeMemberUserByCreateController,
  addNewPeopleToBlackListController,
  removePeopleFromBlackListController
}
