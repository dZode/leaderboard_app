import dbConnect from '../../../lib/dbConnect'
import Leader from '../../../models/Leader'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const leader = await Leader.findById(id)
        if (!leader) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leader })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const leader = await Leader.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!leader) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leader })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedLeader = await Leader.deleteOne({ _id: id })
        if (!deletedLeader) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
