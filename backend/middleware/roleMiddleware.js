module.exports = function (requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole)
      return res.status(403).send("Access Denied");
    next();
  };
};
