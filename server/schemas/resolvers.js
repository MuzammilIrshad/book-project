const User = require("../models/User");
const Books = require("../models/Book");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const jwt = require('jsonwebtoken');


function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    'some very secret key',
    { expiresIn: '1h' }
  );
}
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      const userData = await User.findById({ _id: args.id });
      const booksSaved = await Books.find({ userId: args.id });
      // console.log(userData);
      return { user: userData, savedBooks: booksSaved };
    },
    removeBook: async (parent, { bookId }) => {
      console.log(bookId);
      const book = await Books.findOneAndDelete({ bookId: bookId });
      console.log(book.bookId);

      return { bookId: book.bookId };
    },
    login: async (parent, { email, password }) => {
      console.log({email, password})
      const user = await User.findOne({ email });
      {
        email:
        password:"shshshssuue2728282jss"
      }
      if (!user) {
        throw new AuthenticationError("This info is wrong");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("This info is wrong");
      }

      const token = generateToken(user);
         
      return {user:{
        ...user._doc,
        id: user._id,
        token
      }
    }
    },
  },

  Mutation: {
   

    saveBook: async (parent, { book }) => {
      console.log(book);
      const addedBook = new Books(book);
      console.log(addedBook);
      addedBook.save();
      return { addedBook };
    },
    addUser: async (parent, args) => {
     
      console.log(args);
      const user = new User({ ...args }); 
         const res = await user.save();

      console.log(res);
      const token = generateToken(res);
      console.log(token)
      return {user:{
        ...res._doc,
        id: res._id,
        token
        }
      };
    },
  },
  // }
};

module.exports = resolvers;
