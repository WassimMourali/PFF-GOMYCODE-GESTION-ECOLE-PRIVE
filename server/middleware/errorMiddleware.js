const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue', error: err.message });
  };
  
  module.exports = errorMiddleware;
  