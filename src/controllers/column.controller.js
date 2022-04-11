import { ColumnServices } from '*/services/column.service'
import { httpStatusCode } from '*/utils/constants'
import { responseMessage } from '*/utils/common'

const createNew = async (req, res) => {
  try {
    const result = await ColumnServices.createNew(req.body)
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
    const { id } = req.params
    const result = await ColumnServices.update(id, req.body)
    res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const ColumnController = { createNew, update }
