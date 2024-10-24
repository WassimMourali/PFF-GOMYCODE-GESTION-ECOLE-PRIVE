const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (req.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
      }
      next();
    };
  };
  
  module.exports = checkRole;
  