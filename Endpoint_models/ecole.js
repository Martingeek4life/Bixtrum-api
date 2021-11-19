var mongoose = require('mongoose');

var ecole_virtuelle = mongoose.Schema({
	idUser: { type: String, required: true, unique: true  },
  	nom: { type: String },
  	prenom: { type: String },
  	nationalité: { type: String },
  	sexe: { type: String },
  	date_naissance: { type: String },
  	lieu_naissance: { type: String },
  	telephone: { type: String },
  	domaines_etude: { type: String },
  	diplomes_obtenus: { type: String },
  	certifié: { type: Boolean },
  	description: { type: String },
  	ville: { type: String },
  	avatar: { type: String }
});
module.exports = mongoose.model('ecole_virtuelle', ecole_virtuelle);