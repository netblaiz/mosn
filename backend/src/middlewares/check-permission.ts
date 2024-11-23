import { Request, Response, NextFunction } from 'express'
import { checkUserPermission } from '../helpers/permissions'

export const checkPermission = (

  resource_type: 'Company' | 'Hotel' | 'Feature'
) => async (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req
  const resource_id = req.params[`${resource_type.toLowerCase()}Id`]

  if(!auth || !resource_id) {
    return res.status(400).json({ message: 'User or resource not specified.' })
  }

  try {

    const hasDirectAccess = await checkUserPermission(
      auth._id,
      resource_type,
      resource_id
      )

    if(hasDirectAccess) {
      return next()
    }

    if(hasDirectAccess) {
      return next()
    }

    if(resource_type === 'Hotel') {
      const hotelAccess = await checkUserPermission(auth._id, 'Company', resource_id)
      if (hotelAccess) return next()
    } else if (resource_type === 'Feature') {
      const featureAccess = await checkUserPermission(auth._id, 'Hotel', resource_id)
      if(featureAccess) return next()
    }

  res.status(403).json({ message: 'Access denied to this resource' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}