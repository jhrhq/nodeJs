export const errorHandler = (err, _req, res, _next) => {
  console.log(err.message);
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
};
