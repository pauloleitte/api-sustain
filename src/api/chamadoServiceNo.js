const _ = require('lodash')
const chamado = require('./chamado')

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const cadastrarChamado = (req, res) => {
    const id_incidente = req.body.id_incidente || ''
    const titulo = req.body.titulo || ''
    const grupo = req.body.grupo || ''
    const vencimento = req.body.vencimento || ''
    const abertura = req.body.abertura || ''

    chamado.findOne({ id_incidente }, (err, user) => {
        if (err) { return sendErrorsFromDB(res, err) }
        else if (user) {
            return res.status(400).send({ errors: ['Chamado já cadastrado.'] })
        }
        else {
            const newChamado = new chamado({ id_incidente, titulo, grupo, vencimento, abertura })
            newChamado.save(err => {
                if (err) { return sendErrorsFromDB(res, err) }
                else {
                    return res.status(200).send({ mensagem: `Chamado cadastro com sucesso. ${newChamado._id}`,
                                                  ID_DB: `${newChamado._id}` })
                }
            })
        }
    })
}

const exlcuirChamado = (req, res) => {
    const id_incidente = req.body.id_incidente || ''
    chamado.findOneAndRemove({ id_incidente }, (err, chamado) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (!chamado) {
            return res.status(400).send({ mensagem: 'Não foi possível localizar o chamado informado, por favor verifique o ID informado.' })
        }
        else {
            return res.status(200).send({ mensagem: `Chamado excluido com sucesso.`,
                                          ID_DB: `${chamado._id}` })
        }
    })

}

const atualizarChamado = (req, res) => {
    const id_incidente = req.body.id_incidente || ''
    chamado.findOneAndUpdate({id_incidente}, req.body, { new: true }, (err, chamado) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (!chamado) {
            return res.status(400).send({ mensagem: 'Não foi possível localizar o chamado informado, por favor verifique o ID informado.' })
        }
        else {
            return res.status(200).send({ mensagem: `Chamado atulizado com sucesso.`,
                                          ID_DB: `${chamado._id}` })
        }
        }
    )
}

module.exports = { cadastrarChamado, exlcuirChamado, atualizarChamado }
