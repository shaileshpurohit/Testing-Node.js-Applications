const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function () {
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws(new Error("User not found"));

    const req = {
      body: {
        email: "hello@gmail.com",
        password: "hello123",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });
    User.findOne.restore();
  });
  it("should send a response with a valid user status for an existing user", function (done) {
    mongoose
      .connect("<YOUR_MONGODB_CONNECTION_STRING>")
      .then((result) => {
        const user = new User({
          email: "hello@gmail.com",
          password: "hello123",
          name: "Hello",
          posts: [],
          _id: "64a7f6f4f6f4f6f4f6f4f6f4",
        });
        return user.save();
      })
      .then(() => {
        const req = {
          userId: "64a7f6f4f6f4f6f4f6f4f6f4",
        };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };
        AuthController.getUserStatus(req, res, () => {}).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal("I am new!");
          User.deleteMany({})
            .then(() => {
              return mongoose.disconnect();
            })
            .then(() => {
              done();
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
