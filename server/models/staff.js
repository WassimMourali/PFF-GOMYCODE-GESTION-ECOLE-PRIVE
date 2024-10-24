const mongoose = require('mongoose');
const countryList = [  
    'Algérie',
    'Angola',
    'Bénin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cameroun',
    'Cap-Vert',
    'République centrafricaine',
    'Tchad',
    'Comores',
    'République du Congo',
    'République démocratique du Congo',
    'Djibouti',
    'Égypte',
    'Guinée équatoriale',
    'Érythrée',
    'Eswatini',
    'Éthiopie',
    'Gabon',
    'Gambie',
    'Ghana',
    'Guinée',
    'Guinée-Bissau',
    'Côte d\'Ivoire',
    'Kenya',
    'Lesotho',
    'Libéria',
    'Libye',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritanie',
    'Maurice',
    'Maroc',
    'Mozambique',
    'Namibie',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Sao Tomé-et-Principe',
    'Sénégal',
    'Seychelles',
    'Sierra Leone',
    'Somalie',
    'Afrique du Sud',
    'Soudan',
    'Soudan du Sud',
    'Tanzanie',
    'Togo',
    'Tunisie',
    'Ouganda',
    'Zambie',
    'Zimbabwe'
  ];
const staffSchema = new mongoose.Schema({
firstName : {type : String, required : true},
lastName : {type : String, required : true},
dateOfBirth : {type : Date, required: true},
indetificationNumber : {type: String, required : true},
photoStf: { type: String, required: false },
mobilePhone : {type : String, required : true},
email : {type : String, required : true},
adresse : {type : String, required : true},
country : {type : String, required: true, enum : countryList, default : 'Tunisie'}
});
module.exports = mongoose.model('Staff',staffSchema);