import dbConnect from '../../../lib/dbConnect'
import Leader from '../../../models/Leader'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const leaders = await Leader.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: leaders })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const leader = await Leader.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: leader })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
