import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
  try {
    const result = await CardModel.createNew(data)
    const columnId = result.columnId.toString()
    const cardId = result._id.toString()
    await ColumnModel.pushCardOrder(columnId, cardId)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() }
    if (updateData._id) delete updateData._id

    const result = await CardModel.update(id, updateData)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardServices = { createNew, update }
