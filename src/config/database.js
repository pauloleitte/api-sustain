const mongoose = require('mongoose')
const env = require('../../.env')
mongoose.Promise = global.Promise

const url = process.env.PROD_MONGODB || env.urlMongoDBAWS

module.exports = mongoose.connect(url, {useNewUrlParser: true})


mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo permitido de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo permitido de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é valido para o atributo '{PATH}'."