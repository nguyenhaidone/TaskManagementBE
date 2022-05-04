import { OrderService } from '*/services/order.service'
import { httpStatusCode } from '*/utils/constants'
import { responseMessage } from '*/utils/common'

const createNewOrderController = async (req, res) => {
  try {
    const result = await OrderService.createNewOrderService(req.user, req.body)
    console.log(result)
    return res
      .status(httpStatusCode.OK)
      .json(responseMessage(httpStatusCode.OK, result))
  } catch (error) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const OrderController = { createNewOrderController }
