import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data)
    result.cards = []
    /**
     * *Update columnOrder array in board collection
     */

    const boardId = result.boardId.toString()
    const columnId = result._id.toString()

    await BoardModel.pushColumnOrder(boardId, columnId)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() }
    if (updateData._id) delete updateData._id
    if (updateData.cards) delete updateData.cards
    const result = await ColumnModel.update(id, updateData)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnServices = { createNew, update }
