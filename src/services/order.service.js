import { OrderModel } from "*/models/order.model";
import { hash } from "*/utils/hashPassword";
import { env } from "*/config/environment";
import { genToken } from "*/utils/generationToken";
import { orderDto } from "*/utils/dtos/order.dto";

const createNewOrderService = async (user, data) => {
  try {
    const orderMapping = orderDto.createOrderDto(data, user);
    const result = await OrderModel.createNew(orderMapping, user);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const listOrderService = async (user) => {
  try {
    const result = await OrderModel.listOrder(user);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const OrderService = { createNewOrderService, listOrderService };
