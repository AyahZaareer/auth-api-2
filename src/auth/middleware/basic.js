'use strict';

const base64 = require('../models/users');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return 'error authorization' }

  let basic = req.headers.authorization.split(' ');
  if (basic[0] !== 'Basic') { return 'Invalid auth header' }
  let [user, pass] = base64.decode(basic[1]).split(':');

  try {
    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
