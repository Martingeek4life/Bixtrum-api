var mongoose = require('mongoose');

var apprenant = mongoose.Schema({
	idUser: { type: String, required: true, unique: true  },
  	nom: { type: String },
  	prenom: { type: String },
  	profession: { type: String },
  	nationalité: { type: String },
  	sexe: { type: String },
  	date_naissance: { type: String },
  	lieu_naissance: { type: String },
  	telephone: { type: String },
  	domaines_etude: { type: String },
  	diplomes_obtenus: { type: String },
  	profil_carriere: { type: String },
  	ville: { type: String },
  	avatar: { type: String }
});
module.exports = mongoose.model('apprenant', apprenant);