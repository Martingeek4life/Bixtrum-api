const DB_connexion = require('../DB_connection/Db_connection');
var user_model = require('../Endpoint_models/user');
DB_connexion.DbConnexion();
async function signIn(Payload, res) {
    const userData = {
        name: Payload.name,
        surname: Payload.surname,
        email: Payload.email,
        password: Payload.password
    };

    const successUserData = {
        name: Payload.name,
        surname: Payload.surname,
        email: Payload.email,
        password: Payload.password,
        message: "ok",
        status_code: 200
    };
    let userSign = new user_model(userData);
    userSign.save(function (err, data) {
    	if (err) return res.json(err);

        res.json(successUserData);
      });
}

async function logIn(Payload, res) {
    const userData = {
        email: Payload.email,
        password: Payload.password
    };

    user_model.find().where('email').equals(userData.email).where('password').equals(userData.password).exec(function (err, model) {
    	if (err) return res.json(err);
    	console.log("data", model);
        res.json(model);
    });
}

module.exports = { signIn, logIn };