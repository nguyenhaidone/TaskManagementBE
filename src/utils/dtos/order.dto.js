const createOrderDto = (data, user) => {
  const orderMapping = {
    orderId: data.orderId,
    user: user._id.toString(),
    plan: data.plan,
    amount: data.amount,
    status: data.status,
    createdOrderAt: new Date(data.createdOrderAt),
    payee: data.payee
      ? data.payee
      : {
        email_address: '',
        merchant_id: ''
      },
    metadata: data.metadata ? data.metadata : [{ key: '', value: '' }],
    private_metadata: data.private_metadata
      ? data.private_metadata
      : [{ key: '', value: '' }]
  }

  return orderMapping
}

export const orderDto = { createOrderDto }
