'use strict'

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

async function sendMail(subject, text, user) {
    console.log('enviar mail');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xhosone@gmail.com',
            pass: 'informatica151'
        }
    });

    // let mailOptions = {
    //     to: user.email,
    //     subject: subject, // Subject line
    //     text: text, // plain text body
    //     // html: "<b>Hello world?</b>" // html body
    // };

    console.log('ESTE ES EL PATH', path.join(__dirname, '/html/activateAccount.html'));

    readHTMLFile(__dirname + '/html/activateAccount.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            // from: 'my@email.com',
            to : user.email,
            subject : 'test subject',
            html : htmlToSend
         };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
}

module.exports = {
    sendMail,
};
