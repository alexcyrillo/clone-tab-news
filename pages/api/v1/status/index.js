import database from "/infra/database.js"

function status(req, res) {
  res.status(200).json({chave:"valor"})
}

export default status;