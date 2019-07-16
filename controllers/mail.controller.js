const createError = require('http-errors');
const passport = require('passport');
const nodemailer = require("nodemailer");

module.exports.apply = (req, res, next) => {
    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });
      
      transporter.sendMail({
        from: `"My Awesome Project 👻" <${user}>`,
        to: 'evafrancesmartin@gmail.com', //!<== req.user.emial AYUDA!!!
        subject: 'IronHack Subject', 
        text: 'Ready',
      })
        .then(info => {
            res.json({hola:'todo OK'})
            console.log(info)
        })
        .catch(error => console.log(error))  }


//MENSAJE NODEMAILER
