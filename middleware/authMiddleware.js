export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).send("Unauthorized access");
    }

    const token = authorization.split(" ")[1];

    const jwtData = jwt.verify(token, SECRET_KEY);

    const user = await userModel.findById(jwtData.userId);
    if (!user) {
      return res.status(401).send("Unauthorized user!");
    }

    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};
