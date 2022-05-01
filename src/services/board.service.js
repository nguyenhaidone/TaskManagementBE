import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (id) => {
  try {
    const [result] = await BoardModel.getFullBoard(id)
    const tranformBoard = cloneDeep(result)
    /**
     * !filter is destroy
     */
    tranformBoard.columns = result.columns.filter((col) => !col._destroy)
    /**
     * !Mapping data
     */
    tranformBoard.columns.forEach((col) => {
      col.cards = tranformBoard.cards.filter(
        (c) => c.columnId.toString() === col._id.toString()
      )
    })
    // console.log(tranformBoard)
    delete tranformBoard.cards

    return tranformBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() }
    if (updateData._id) delete updateData._id
    if (updateData.cards) delete updateData.cards
    const result = await BoardModel.update(id, updateData)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getListBoardByUserIdService = async (accessTokenFromHeader) => {
  try {
    const result = await BoardModel.getListBoardByUser(accessTokenFromHeader)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardServices = {
  createNew,
  getFullBoard,
  update,
  getListBoardByUserIdService
}
