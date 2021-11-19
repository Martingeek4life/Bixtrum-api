const bcrypt = require("bcrypt");
const DB_connexion = require('../DB_connection/Db_connection');
var user_model = require('../Endpoint_models/user');
var apprenant_model = require('../Endpoint_models/apprenant');
var ecole_model = require('../Endpoint_models/ecole');
var formateur_model = require('../Endpoint_models/formateur');
const mailService = require('./mailService');
DB_connexion.DbConnexion();
async function signIn(Payload, res) {
    var userData = {
        email: Payload.email,
        password: Payload.password,
        role: Payload.role,
        isValid: Payload.isValid,
        uniqueString: Payload.uniqueString
    };
    console.log("var userData: ", userData);
    const successUserData = {
        email: Payload.email,
        password: Payload.password,
        role: Payload.role,
        isvalid: Payload.isvalid,
        uniqueString: Payload.uniqueString,
        message: "user registered successfully",
        status_code: 200
    };
    const saltRounds = 10;
    console.log("avant le hash", userData.password);
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
            userData.password = hash;
            console.log("après le hash", userData.password);
            let userSign = new user_model(userData);
            console.log("new user: ", userSign);
            userSign.save(function (err, data) {
                if (err) return res.status(403).json({ message: "this e-mail is already registered" });
                // else if(err.code != 11000) return res.json({ message: "failed to save" });
                else {
                    if(data.role === 'apprenant') {
                        let userApprenant = new apprenant_model({ idUser: data._id });
                        userApprenant.save(function (err, apprenant) {
                            if (err) return res.status(403).json({ message: "failed to register apprenant" });
                            else res.json(apprenant);
                            mailService.sendMail(userData.email, userData.uniqueString);
                        });
                    }

                    if(data.role === 'ecole') {
                        let userEcole = new ecole_model({ idUser: data._id });
                        userEcole.save(function (err, ecole) {
                            if (err) return res.status(403).json({ message: "failed to register ecole virtuelle" });
                            else res.json(ecole);
                            mailService.sendMail(userData.email, userData.uniqueString);
                        });
                    }

                    if(data.role === 'formateur') {
                        let userFormateur = new formateur_model({ idUser: data._id });
                        userFormateur.save(function (err, formateur) {
                            if (err) return res.status(403).json({ message: "failed to register formateur" });
                            else res.json(formateur);
                            mailService.sendMail(userData.email, userData.uniqueString);
                        });
                    }
                    // res.json(data);
                }
              });
        });
    });
}

async function logIn(Payload, res) {
    const userData = {
        email: Payload.email,
        password: Payload.password
    };

    user_model.find().where('email').equals(userData.email).exec(function (err, model) {
        if(model.length == 0) return res.status(400).json({ message: "Email does not exist" });
        // console.log("model from DB", model);
        bcrypt.compare(userData.password, model[0].password, function(err1, bool) {
            if(bool == true) {
                if (err) return res.json(err);
                console.log("data", model);
                res.json(model[0]);
            }
            else res.status(400).json({ message: "Invalid Password" });
        });
    });
}

async function emailVerify(uniqueString, res) {
	console.log("enter emailVerify");
	await user_model.find().where('uniqueString').equals(uniqueString).exec(function (err, user) {
		if(user.length == 0) return res.status(400).json({ message: "User not found" });
		else {
			user[0].isValid = true;
			// console.log("user after find: ", user);
			new user_model(user[0]).save(function (err, user) {
				if(err) res.json("error update")
				else res.json("email verified true");
			});
		}
	});
}

module.exports = { signIn, logIn, emailVerify };