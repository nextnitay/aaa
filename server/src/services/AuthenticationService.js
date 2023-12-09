const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { account, user } = require('../models');
const passwordUtil = require('../utils/passwordUtil');
const BaseResponseError = require('../errors/BaseResponseError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

class AuthenticationService extends BaseService {
  static getInstance() {
    if (!AuthenticationService.INSTANCE) {
      AuthenticationService.INSTANCE = new AuthenticationService();
    }

    return AuthenticationService.INSTANCE;
  }

  async registerUserAccount({ accountData, userData }) {
    const insertData = async (transaction) => {
      try {
        const hashedPassword = await passwordUtil.hashPassword(
          accountData.password,
        );

        await account.create(
          { ...accountData, password: hashedPassword, user: userData },
          {
            include: user,
            transaction,
          },
        );
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new BadRequestError('The account is already registered');
        }
        throw new ServerError();
      }
    };

    await this.createDbTransaction(insertData);
  }

  async verifyAccount({ email, password }) {
    const findAccount = async (transaction) => {
      const accountData = await account.findOne({
        where: { email },
        attributes: ['id', 'password', 'role'],
        transaction,
      });

      if (!accountData) {
        throw new NotFoundError('Email not found');
      }

      return accountData;
    };

    try {
      const accountData = await this.createDbTransaction(findAccount);

      if (
        !(await passwordUtil.verifyPassword(password, accountData.password))
      ) {
        throw new UnauthorizedError('Wrong password');
      }

      return accountData;
    } catch (error) {
      if (error instanceof BaseResponseError) {
        throw error;
      }
      throw new ServerError();
    }
  }
}

module.exports = AuthenticationService;
