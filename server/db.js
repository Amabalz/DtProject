const sql = require('mssql/msnodesqlv8');

const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-SI9FETN;Database=PansDatabase;Trusted_Connection=yes;';

const config = {
    connectionString: connectionString,
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        encrypt: false
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server Successfully');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed', err);
        process.exit(1);
    });

module.exports = poolPromise;