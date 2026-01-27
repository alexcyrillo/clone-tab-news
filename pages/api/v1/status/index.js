import database from "/infra/database.js"

async function status(req, res) {

  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbName = process.env.POSTGRES_DB;
  const dbActiveConnections = await database.query({text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName]
  });

  const updatedAt = new Date().toISOString();
  const postgresVersion = dbVersion.rows[0].server_version;
  const maxConnections = parseInt(dbMaxConnections.rows[0].max_connections);
  const activeConnections = parseInt(dbActiveConnections.rows[0].count);

  res.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: postgresVersion,
          max_connections: maxConnections,
          active_connections: activeConnections
  }}})
}

export default status;