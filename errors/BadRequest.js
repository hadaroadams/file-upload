const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class BadRequest extends CustomError {
  constructor(messgae) {
    super(messgae);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest
