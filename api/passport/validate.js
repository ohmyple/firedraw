
module.exports = {
  validateEmail: (email, res) => {
    const validEmailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if(!validEmailRegex.test(email)) {
      console.log('invalid email: ' + email)
      res.send('invalid email')
      return false
    }
    return true
  },
      
  dbInvalidHandler: (err, res) => {
    if(err.constraint === 'users_email_key' ) {
      console.log('inside of email err: ' + err.constraint)
      res.send('email already used')
    } else if(err.constraint === 'users_username_key' ) {
      console.log('inside of username err: ' + err.constraint)
      res.send('username already used')
    } else {
      res.send('something else went wrong')
    }
  }
}
