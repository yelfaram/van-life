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

export const getHostById = async (hostId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT email, first_name, last_name FROM owner WHERE owner_id = $1",
                [hostId],
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
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getRenterById = async (renterId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "SELECT email, first_name, last_name FROM renter WHERE renter_id = $1",
                [renterId],
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
            )
        })
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

export const getAvailableVansForHost = async (hostId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                `SELECT v.van_id, v.owner_id, v.name, v.price, v.description, v.image_url, v.type
                FROM van v
                JOIN owner o ON v.owner_id = o.owner_id
                WHERE v.owner_id != $1`,
                [hostId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ vans: results.rows });
                    } else {
                        resolve({ vans: null })
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getAvaliableVansForRenter = async () => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                `SELECT v.van_id, v.owner_id, v.name, v.price, v.description, v.image_url, v.type
                FROM van v
                WHERE v.van_id NOT IN (SELECT r.van_id
                    FROM rental r
                    WHERE NOW() BETWEEN r.start_date AND r.end_date
                )`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ vans: results.rows });
                    } else {
                        resolve({ vans: null })
                    }
                }
            )
        })
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

export const getHostRentedVans = async (hostId) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                `SELECT r.rental_id, r.van_id, r.total_cost, r.placed_date, r.start_date, r.end_date 
                FROM rental r
                JOIN van v ON r.van_id = v.van_id
                WHERE v.owner_id = $1`,
                [hostId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ hostRentedVans: results.rows })
                    } else {
                        resolve({ hostRentedVans: null })
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getUserRentals = async (email) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                `SELECT r.rental_id, r.email, v.van_id, v.name, v.image_url, v.type, r.total_cost, r.start_date, r.end_date
                FROM rental r 
                JOIN van v on r.van_id = v.van_id
                WHERE email = $1`,
                [email],
                (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    if (results && results.rows.length > 0) {
                        resolve({ rentals: results.rows })
                    } else {
                        resolve({ rentals: null })
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

export const insertRental = async (vanId, email, totalCost, startDate, endDate) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO rental (van_id, email, total_cost, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [vanId, email, totalCost, startDate, endDate],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve(`Rental added with ID: ${results.rows[0].rental_id} for User with email: ${email}`)
                    }
                }
            ) 
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertReview = async (email, vanId, rating, description) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO review (email, van_id, rating, description) VALUES ($1, $2, $3, $4) RETURNING *",
                [email, vanId, rating, description],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows.length > 0) {
                        resolve(`Review added for User with email: ${results.rows[0].email} for van with ID: ${results.rows[0].van_id}`)
                    }
                }
            )
        })
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}