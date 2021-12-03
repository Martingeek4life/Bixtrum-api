const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
  return jwt.sign(userId, 'RANDOM_TOKEN_SECRET', { expiresIn: '86400s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, userId) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    next();
  })
}

module.exports = { generateAccessToken, authenticateToken };