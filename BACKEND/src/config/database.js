const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const config = {
    connectionString: `Driver={ODBC Driver 18 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;TrustServerCertificate=Yes;`
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Conectado correctamente a SQL Server");
        return pool;
    })
    .catch(error => {
        console.error("Error al conectar con SQL Server:", error);
        throw error;
    });

module.exports = {
    sql,
    poolPromise
};