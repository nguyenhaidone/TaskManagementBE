import { BoardModel } from '*/models/board.model'

const isAccessBoard = async (req, res, next) => {
  const user = req.user
  const boardId = req.params.id
  const [result] = await BoardModel.getFullBoard(boardId)
  if (!result || result._destroy) {
    return res.status(404).send('Board not found!')
  }
  if (result.creater.toString() != user._id.toString()) {
    const isMember = result.members.find((email) => email === user.email)
    if (!isMember) {
      return res
        .status(401)
        .send('You do not have permission to access this board!')
    }
    req.board = result
    return next()
  } else {
    return next()
  }
}

export const BoardMiddleware = { isAccessBoard }
