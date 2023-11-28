import { query } from "express";
import connection from "./db/connection.js";

export const authenticateUser = async (email, password, userType) => {
    let query = "SELECT owner_id FROM owner WHERE email = $1 AND password = $2"

    if (userType === "renter") {
        query = "SELECT renter_id FROM renter WHERE email = $1 AND password = $2";
    }

    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                query,
                [email, password],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ user: results.rows[0]});
                    } else {
                        resolve({ user: null });
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

export const insertRenter = async (email, password, firstName, lastName) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO renter (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
                [email, password, firstName, lastName],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve(`Renter added with ID: ${results.rows[0].renter_id}`)
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertRental = async (vanId, renterId, startDate, endDate) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO rental (van_id, renter_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
                [vanId, renterId, startDate, endDate],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve(`Rental added with ID: ${results.rows[0].rental_id} for User ID: ${renterId}`)
                    }
                }
            ) 
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}