import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  //  req.headers.authorization contains => 'Bearer ${token}'
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
