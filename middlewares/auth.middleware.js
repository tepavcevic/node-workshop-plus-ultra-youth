import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants/constants.js';

const verifyJwt = (req, res, next) => {
  try {
    const bearerToken =
      req.headers?.Authorization || req.headers?.authorization;

    const token = bearerToken?.split(' ')[1];

    const result = jwt.verify(token, SECRET_KEY);

    req.user = result.data;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send('Forbidden');
  }
};

export default verifyJwt;
