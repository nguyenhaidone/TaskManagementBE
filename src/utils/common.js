export const responseMessage = (status, message) => {
  return {
    status: status,
    data: message ? message : []
  }
}
