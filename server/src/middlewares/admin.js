const isAdmin = async (req, res, next) => {
  if(!req.user.isAdmin) return res.status(403).json({status: 403, message: 'Access denied. You are not an Admin'})
}

export default isAdmin;