import fs from 'fs';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import { SALT_ROUNDS, SECRET_KEY } from '../constants/constants.js  ';
import { ROLES } from '../constants/constants.js';

export const registerUser = async (req, res) => {
  try {
    const { password, ...user } = req.body;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userToSave = {
      ...user,
      id: uuid(),
      password: hashedPassword,
      role: ROLES.ADMIN,
    };

    if (parsedDb.users) {
      parsedDb.users.push(userToSave);
    } else {
      parsedDb.users = [userToSave];
    }

    fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, 2));

    res.status(201).send({ id: userToSave.id, ...user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const foundUser = parsedDb.users?.find((user) => user.email === email);

    if (!foundUser)
      return res.status(400).send("User with this email doesn't exist");

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).send('Login failed');

    const token = jwt.sign(
      {
        data: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const validateToken = (req, res) => {
  try {
    const { token } = req.body;

    jwt.verify(token, SECRET_KEY);

    res.status(200).send('Token valid');
  } catch (error) {
    console.log(error);
    res.status(401).send('Token invalid');
  }
};
