const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function () {
  before(function (done) {
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
        done();
      });
  });

  beforeEach(function () {});
  afterEach(function () {});

  it("should add a Created post to the posts of the created", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post Content",
      },
      file: {
        path: "test-image.jpg",
      },
      userId: "64a7f6f4f6f4f6f4f6f4f6f4",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
