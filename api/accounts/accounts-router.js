const express = require('express');
const ACCOUNTS = require('./accounts-model');
const {
     checkAccountId,
     checkAccountPayload,
     checkAccountNameUnique
} = require('./accounts-middleware');

const router = express.Router();

router.get('/', async (request, response, next) => {
     ACCOUNTS.getAll()
          .then(accounts => {
               response.json(accounts)
          })
          .catch(next)
})

router.get('/:id', checkAccountId, async (request, response, next) => {
     try {
          const account = await ACCOUNTS.getById(request.params.id)
          response.json(account)
     }
     catch (error) {
          next(error)
     }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (request, response, next) => {
     try {
          const account = await ACCOUNTS.create({ name: request.body.name.trim(), budget: request.body.budget })
          response.status(201).json(account)
     }
     catch (error) {
          next(error)
     }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (request, response, next) => {
     try {
          const account = await ACCOUNTS.updateById(request.params.id, request.body)
          response.json(account)
     }
     catch (error) {
          next(error)
     }
});

router.delete('/:id', checkAccountId, async (request, response, next) => {
     try {
          const account = await ACCOUNTS.deleteById(request.params.id)
          response.json(account)
     }
     catch (error) {
          next(error)
     }
})

router.use((error, request, response, next) => { // eslint-disable-line
     response.status(error.status || 500).json({
          message: error.message,
          stack: error.stack
     })
})

module.exports = router;
