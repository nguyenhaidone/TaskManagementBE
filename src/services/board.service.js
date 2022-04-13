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
    delete tranformBoard.cards

    return tranformBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardServices = { createNew, getFullBoard }
