const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

describe('User Model', () => {
  it('should generate a valid auth token', () => {
    const user = new User({ _id: new mongoose.Types.ObjectId(), isAdmin: true });
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      expect(decoded).toMatchObject({ _id: user._id.toHexString(), isAdmin: true });
  });
    
});