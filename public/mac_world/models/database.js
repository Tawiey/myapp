/**
 * Created by tawanda on 11/10/16.
 */

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://tawanda:serverside@localhost:5432/mac_world';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    'CREATE TABLE JOBS(id SERIAL PRIMARY KEY, message VARCHAR(100),cus_email VARCHAR(40),cus_contact INT, complete BOOLEAN)');
query.on('end', () => { client.end(); });
