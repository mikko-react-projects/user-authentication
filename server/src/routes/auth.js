import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail, sendResetPasswordEmail } from '../mailer';

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if(user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ global: "Invalid credentials" });
    }
  });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() })
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(
    user =>
      user ?
        res.json({ user: user.toAuthJSON() }) :
        res.status(400).json({ confirmed: false })
  );
});

router.post("/reset_password_request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({ user: { }});
    } else {
      res
        .status(400)
        .json({ global: "There is no user with such email" });
    }
  });
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({ });
    } else {
      res.json({ });
    }
  });
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ global: "Invalid token" });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({ }));
        } else {
          res.status(404).json({ global: "Invalid token" });
        }
      });
    }
  });
});

export default router;
