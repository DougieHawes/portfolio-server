const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.isAuth = (req, res, next) => {
  const authToken = req.header("auth-token");

  if (!authToken) {
    return res.status(401).json({ msg: "no auth-token found" });
  }

  try {
    jwt.verify(authToken, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "invalid token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.newUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    let user = new User({
      name,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

exports.signIn = async (req, res) => {
  const { name, password } = req.body;

  try {
    let user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    } else {
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.signOut = (req, res) => {
  res.clearCookie("authToken");

  res.status(200).json({ msg: "signout route" });
};
