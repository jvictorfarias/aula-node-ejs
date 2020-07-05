const express = require('express')
const path = require('path')
const { Router } = require('express')
const api = require('./helpers/api')

const app = express()
const routes = new Router()

routes.get('/', (request, response) => {
  const { search } = request.query;

  api.get('/deputados', {
    params: {
      ordem: 'ASC',
      ordenarPor: 'nome',
      nome: search
    }
  })
    .then(({ data }) => {
      return response.status(200).render('index', { deputados: data.dados })
    })
    .catch(err => console.log(err))
})

routes.get('/info/:id', (request, response) => {
  const { id } = request.params;

  api.get(`/deputados/${id}`)
    .then(({ data: { dados: { ultimoStatus } } }) => {
      return response.status(200).render('info', { deputado: ultimoStatus })
    })
    .catch(err => console.log(err))
})


// Config
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(routes)




module.exports = app;