const nodemailer = require('nodemailer');

async function sendMail(userMail, uniqueString) {
	console.log("user mail and uniqueString: ", userMail + uniqueString);

  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.yeki_mail,
      pass: process.env.pass_mail,
    },
  });

	var mailOptions;
	let sender = process.env.yeki_mail;
	mailOptions = {
		from: sender,
		to: userMail,
		subject: "confirmation Email",
		html: `<center><img src=http://image.noelshack.com/fichiers/2021/46/3/1637175133-design-yekiconnect1-03.png style="display:block;" height="127" width="100"><h1 style="font-size:26px;line-height:30px;color:#1D2686;">Bienvenue chez Yeki&nbsp;!<br> Pouvez-vous confirmer votre e-mail&nbsp;? </h1></p><a href=http://localhost:3080/api/verify/${uniqueString} target="_blank" style="padding: 18px 22px; border: 1px solid;border-radius: 30px;font-family: Helvetica, Arial, sans-serif;font-size: 18px; background: #00AFF5; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Je confirmer mon e-mail</a><hr><p style="font-size:12px;color:#708C91;">Cet e-mail vous a été envoyé par Yeki une start-up de Bixterprise SARL. Siège social Yaoundé, Cameroun.<br>Merci</p> <center>`
	};

	transporter.sendMail(mailOptions, function(error, response) {
		if(error) {
			console.log(error);
		} else {
			console.log("Message sent: ", response);
		}
	});
}
module.exports = { sendMail };
