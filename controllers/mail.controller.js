const createError = require('http-errors');
const passport = require('passport');
const nodemailer = require("nodemailer");
const Parking = require('../models/parking.model');

module.exports.apply = (req, res, next) => {
    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS 
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });
      
      transporter.sendMail({
        from: `"My Awesome Project 👻" <${user}>`,
        to: 'evafrancesmartin@gmail.com', //!<== req.user.emial AYUDA!!!
        subject: 'Ohhh mama', 
        text: 'sos una crack ',
      })
        .then(info => {
            res.json({hola:'todo OK'})
            //! Ayuda para restar plazas
            Parking.findByIdAndUpdate({_id:this.props.body.parking, places: -1})
            .then()
        })
        .catch(error => console.log(error))  }


//MENSAJE NODEMAILER
