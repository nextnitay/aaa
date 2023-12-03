const AuthenticationService = require('../services/AuthenticationService');
const tokenUtil = require('../utils/tokenUtil');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const authenticationService = AuthenticationService.getInstance();
    const account = await authenticationService.verifyAccount(email, password);

    // generate token
    const user = await account.getUser({
      attributes: ['username', 'avatarUrl', 'firstName', 'lastName'],
    });
    const token = tokenUtil.generateToken({ username: user.username });

    res.status(200).json({
      status: 'OK',
      message: 'Login success',
      data: {
        token,
        role: account.role,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;