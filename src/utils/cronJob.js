import nodeCron from 'node-cron'
import { UserModel } from '*/models/user.model'

const task = nodeCron.schedule('00 00 00 * * *', async () => {
  console.log('cron starting. . .')
  const result = await UserModel.cancelService()
  console.log(result)
})

exports.cronStart = function cronJobFunction(req, res, next) {
  task.start()
}
