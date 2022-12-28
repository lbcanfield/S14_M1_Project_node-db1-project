const db = require('../../data/db-config');

const getAll = () => {
     const query = db('accounts')
     return query
}

const getById = id => {
     const query = db('accounts').where("id", id).first()
     return query
}

const create = async account => {
     const [id] = await db('accounts').insert(account)
     return getById(id)
}

const updateById = async (id, account) => {
     await db('accounts').update(account).where('id', id)
     return getById(id)
}

const deleteById = async (id) => {
     const removedAccount = getById(id)
     await db('accounts').del().where('id', id)
     return removedAccount
}

module.exports = {
     getAll,
     getById,
     create,
     updateById,
     deleteById,
}
