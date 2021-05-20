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

    //New schema for notes
    const Schema= mongoose.Schema;
    const noteSchema = new Schema({
      groupName: {
        type: String,
        required: true
      },
      noteTitle: {
        type: String,
        required: true
      },
      noteText:{
        type: String,
        required: true
      }, 
      createdAt: {
          type: Date,
          default: Date.now
      }
    });

    //Model for Note
    const noteModel= mongoose.model('note', noteSchema, 'notes');

    //Insert New Note
    const insertNote = async(newNote) => {
        try{
            const newModel = new noteModel(newNote);
            return await noteModel.create(newModel);
        } catch (err){
            console.log(err);
            return false;
        }
    }

    //Retrieve Notes
    const fetchNote = async(groupName) => {
        try{
            const response = noteModel.find({
                groupName,
            }).exec();
            console.log("done");
            return response;
        } catch (err){
            console.log(err);
            return false;
        }
    }

    //Exporting functions insertNote & fetchNote
    module.exports = {insertNote, fetchNote};
