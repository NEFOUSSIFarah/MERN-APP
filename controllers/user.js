const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    // req.body => newUser
    const { name, email, password, phone } = req.body
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: 'This email has been used, try again!' }] })
    }
    const slatRound = 10
    const hashedpassword = await bcrypt.hash(password, saltRound)

    //const newUser
    const newUser = new User({ ...req.body })
    newUser.password = hashedpassword

    //save
    await newUser.save()
    //creation of token
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env,
      SECRET_KEY,
      { expiresIn: '1h' }
    )
    res
      .status(200)
      .send({ msg: 'Registered successfully', user: newUser, token })
  } catch (error) {
    res.status(400).send({ errors: [{ msg: 'Cannot register' }] })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if email exists
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: 'Wrong name or password' }] })
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password)
    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: 'Bad credentials' }] })
    }
    // token creation 2
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env,
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).send({ msg: 'Bad credentials 2', user: foundUser, token })
  } catch (error) {
    res.status(400).send({ errors: [{ msg: 'Cannot login' }] })
  }
}