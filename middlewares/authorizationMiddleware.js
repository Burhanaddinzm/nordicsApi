module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const isAuthorized = allowedRoles.includes(userRole);

    if (!isAuthorized) {
      return res.status(401).json({ status: 401, message: "Access denied" });
    }

    next();
  };
};
