export function errorHandler(err, req, res, next) {
  const status = err.status || 503;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
}
