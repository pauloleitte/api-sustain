const restful = require('node-restful')
const mongoose = restful.mongoose
mongoose.set('useFindAndModify', false);

const chamadoSchema = new mongoose.Schema({
    id_incidente: { type: String, required: true },
    titulo: { type: String, required: true },
    grupo: { type: String, required: true },
    vencimento: { type: String, required: true },
    abertura: { type: String, required: true },
    atualizacao: { type: Date, default: Date.now }
})

module.exports = restful.model('chamado', chamadoSchema)