const db = require('../../data/db-config')

exports.checkAccountPayload = (request, response, next) => {
     const { name, budget } = request.body
     if (name === undefined || budget === undefined) {
          next({ status: 400, message: "name and budget are required" })
     }
     else if (typeof (budget) !== 'number' || isNaN(budget)) {
          next({ status: 400, message: "budget of account must be a number" })
     }
     else if (typeof (name) !== 'string') {
          next({ status: 400, message: "name of account must be a string" })
     }
     else if (name.trim().length < 3 || name.trim().length > 100) {
          next({ status: 400, message: "name of account must be between 3 and 100" })
     }
     else if (budget < 0 || budget > 1000000) {
          next({ status: 400, message: "budget of account is too large or too small" })
     }
     else if (!parseInt(budget) || !parseFloat(budget)) {
          next({ status: 400, message: "must be a number" })
     }
     else {
          next()
     }
}

exports.checkAccountNameUnique = async (request, response, next) => {
     try {
          const checkUnique = await db('accounts').where('name', request.body.name.trim()).first()
          if (checkUnique) {
               next({ status: 400, message: "that name is taken" })
          }
          else {
               next()
          }
     }
     catch (error) {
          next(error)
     }
}

exports.checkAccountId = async (request, response, next) => {
     const account = await db('accounts').where('id', request.params.id).first()
     if (!account) {
          next({ status: 404, message: "account not found" })
     }
     else {
          next()
     }
}

