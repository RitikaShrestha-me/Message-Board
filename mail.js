var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'web.buzz.note@gmail.com',
    pass: 'buzzy@2020note'
  }
});

// let mailId = [];

    var registrationMail = {
      from: 'web.buzz.note@gmail.com',
      to: 'poudyalshreya1@gmail.com',
      subject: 'Hurray, Registration Successful!!!',
      text: `Thank you for registering with us! 
      
      This app is created to help families or companies keep a record of important notes.
      Hope you like our app,
      BuzzNote Team
      `
    };


    transporter.sendMail(registrationMail, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

// 'umangharlalka15@gmail.com', 'shrestharitika189@gmail.com', 'shrestha.tejash@gmail.com'