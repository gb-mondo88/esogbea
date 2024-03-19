//requiredRoles: the roles required to access the route

const authorize =
  (requiredRoles, onlyAllowSameUser = false) =>
  (req, res, next) => {
    const userRoles = req.decoded.roles;
    const { uid } = req.params;

    if (onlyAllowSameUser && uid && req.decoded.uid !== uid)
      return res.status(403).json({
        code: "403",
        error: "Forbidden: Not authorize",
      });

    if (!userRoles)
      return res.status(403).json({
        code: "403",
        error: "Forbidden: Not authorize",
      });

    const userHasRequiredRole = userRoles.some((role) =>
      requiredRoles.includes(role)
    );

    if (!userHasRequiredRole)
      return res.status(403).json({
        code: "403",
        error: "Forbidden: Not authorize",
      });
    next();
  };

module.exports = authorize;
