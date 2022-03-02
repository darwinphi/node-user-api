import JWT from "jsonwebtoken";
const secret = "HWQXTVdJWQ3SDJ6Lkb45XFGAWpAu4vPk";

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.json({
      errors: [
        {
          msg: "No token",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(token, secret);
    req.user = user.email;
    next();
  } catch (error) {
    return res.json({
      errors: [
        {
          msg: "Please login",
        },
      ],
    });
  }
};

export default auth;
