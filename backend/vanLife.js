import connection from "./db/connection.js";

export const authenticateUser = async (email, password) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT owner_id FROM owner WHERE email = $1 AND password = $2",
                [email, password],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ owner: results.rows[0]});
                    } else {
                        resolve({ owner: null });
                    }
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVans = async () => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM van", (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows.length > 0) {
                    resolve({ vans: results.rows });
                } else {
                    resolve({ vans: null })
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVanById = async (vanId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM van WHERE van_id = $1", 
                [vanId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ van: results.rows[0] });
                    } else {
                        resolve({ van: null });
                    }
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostVans = async (hostId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM van WHERE owner_id = $1",
                [hostId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ hostVans: results.rows });
                    } else {
                        resolve({ hostVans: null })
                    }
                }
            )
        });
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostVanById = async (hostId, vanId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM van WHERE owner_id = $1 AND van_id = $2",
                [hostId, vanId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ hostVan: results.rows[0] });
                    } else {
                        resolve({ hostVan: null })
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

// INSERTS

export const insertOwner = async (email, password, firstName, lastName) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO owner (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
                [email, password, firstName, lastName],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve(`Host added with ID: ${results.rows[0].owner_id}`)
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}