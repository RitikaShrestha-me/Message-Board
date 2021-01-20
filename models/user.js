//Require Mongoose for MongoDB
const mongoose = require('mongoose');

//Key for MongoDB database
const dbURI='mongodb+srv://buzz:buzz@2020note@buzznote.n2yvn.mongodb.net/buzznote?retryWrites=true&w=majority';

//Connecting Database
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const Schema= mongoose.Schema;
    const mySchema = new Schema({
      userName: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true,
        required: true
      },
      groupName: {
        type: String,
        required: true
      },
      createdAt:{
          type: Date,
          default: Date.now
      }
    });

    // Making model
    const myModel= mongoose.model('user', mySchema, 'users');

    // To insert user
    const insertUser = async(newUser) => {
        try{
            const newModel = new myModel(newUser);
            return await myModel.create(newModel);
        } catch (err){
            console.log(err);
            return false;
        }
    }

    //Retreiving User from Database
    const fetchUser = async(userName) => {
        try{
            const response = myModel.findOne({
                userName,
            }).exec();
            console.log("done");
            return response;
        } catch (err){
            console.log(err);
            return false;
        }
    }

    //Exporting functions insertUser & fetchUser
    module.exports = {insertUser, fetchUser};
