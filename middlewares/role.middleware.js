import { PERMISSIONS } from '../constants/constants.js';

const verifyRole = (req, res, next) => {
  try {
    const { user } = req;
    const endpoint = req.method + req.url;

    console.log(user);

    console.log(PERMISSIONS[user.role].includes(endpoint));
    if (!PERMISSIONS[user.role].includes(endpoint)) {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).send('Forbidden');
  }
};

export default verifyRole;
