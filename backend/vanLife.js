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
                        resolve(results.rows[0].owner_id);
                    } else {
                        reject(new Error("No owner found"));
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
                    resolve(results.rows);
                } else {
                    reject(new Error("No vans found"));
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
                        resolve(results.rows[0]);
                    } else {
                        reject(new Error(`No van with id:${vanId} found`));
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
                        resolve(results.rows);
                    } else {
                        reject(new Error(`No vans with owner_id:${hostId} found`));
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
                        resolve(results.rows[0]);
                    } else {
                        reject(new Error(`No van with owner_id:${hostId} and van_id:${vanId} found`));
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}