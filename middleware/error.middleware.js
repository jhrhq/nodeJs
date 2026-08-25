export const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const statusCode = err.statusCode || 500;

  return res.statusCode(statusCode).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
};
