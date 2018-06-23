module.exports.notFound = (req, res, next) => {
  res.status(404).json({
    path: req.url,
    method: req.method,
    message: 'Route does not exist',
    status: 404
  });
}
