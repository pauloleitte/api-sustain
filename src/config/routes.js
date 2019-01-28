const express = require('express')
const chamadoService = require('../api/chamadoService')
const chamadoServiceNo = require('../api/chamadoServiceNo')

module.exports = function (server) {

    const router = express.Router()

    server.use('/api', router)

    router.get('/', (req, res) => res.json({ message: 'Acesso Restrito!' }));

    chamadoService.register(router, '/chamado')

    router.post('/chamadoNo', chamadoServiceNo.cadastrarChamado)
    router.delete('/chamadoNo', chamadoServiceNo.exlcuirChamado)
    router.put('/chamadoNo', chamadoServiceNo.atualizarChamado)



}