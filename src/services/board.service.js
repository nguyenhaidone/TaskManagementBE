import { BoardModel } from '*/models/board.model'

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
    /**
     * !Mapping data
     */
    result.columns.forEach((col) => {
      col.cards = result.cards.filter(
        (c) => c.columnId.toString() === col._id.toString()
      )
    })
    delete result.cards

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardServices = { createNew, getFullBoard }
