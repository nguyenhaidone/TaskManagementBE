import { BoardModel } from '*/models/board.model'

const isAccessBoard = async (req, res, next) => {
  const user = req.user
  const boardId = req.params.id
  const [result] = await BoardModel.getFullBoard(boardId)
  if (!result || result._destroy) {
    return res.status(404).send('Board not found!')
  }
  if (result.creater !== user._id) {
    console.log(result.creater)
    console.log(user._id)
    const isMember = result.members.find((email) => email === user.email)
    if (!isMember) {
      return res.status(401).send('You do not have permission to access!')
    }
    return next()
  } else {
    return next()
  }
}

export const BoardMiddleware = { isAccessBoard }
