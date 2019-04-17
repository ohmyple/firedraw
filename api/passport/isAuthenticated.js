
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {

    const locals = res.locals.user = req.user
    locals.isAuthenticated = true

    // res.send(locals)

    next()
  } else {
    res.status(401)
  }
}

module.exports = isAuthenticated
