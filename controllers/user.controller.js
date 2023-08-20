import fs from 'fs';
import { v4 as uuid } from 'uuid';

import User from '../models/users.model.js';

export const getUsers = (req, res) => {
  try {
    const users = User.find();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  const db = fs.readFileSync('./db.json', 'utf-8');
  const { users } = JSON.parse(db);

  const found = users?.find((user) => user.id === id);
  if (!found) return res.status(404).send(`User with id ${id} not found.`);

  delete found?.password;
  res.status(200).send(found);
};

export const createUser = (req, res) => {
  try {
    const user = req.body;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const newUser = {
      id: uuid(),
      ...user,
    };

    if (db.users) {
      parsedDb.users.push(newUser);
    } else {
      parsedDb.users = [newUser];
    }

    fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, 2));

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
};

export const putUser = (req, res) => {
  try {
    const user = req.body;
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);

    if (index < 0) return res.status(400).send("User doesn't exist");

    parsedDb.users[index] = { ...parsedDb.users[index], ...user };

    fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, 2));

    res.status(200).send('Updated user');
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
};

export const patchUser = (req, res) => {
  try {
    const user = req.body;
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);

    for (const [key, value] of Object.entries(user)) {
      parsedDb.users[index][key] = value;
    }

    fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, 2));

    res.status(200).send('Updated user');
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
};

export const deleteUser = (req, res) => {
  try {
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);

    if (index < 0) return res.status(404).send('User not found');

    parsedDb.users.splice(index, 1);
    fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, 2));
    res.status(204);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
};
