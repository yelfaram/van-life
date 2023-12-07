import { hash, compare } from 'bcrypt';
import { executeQuery } from "./utils/helpers.js"

export const authenticateUser = async (email, password, userType) => {
    const query = userType === "renter"
        ? "SELECT renter_id, password FROM renter WHERE email = $1"
        : "SELECT owner_id, password FROM owner WHERE email = $1";
    try {
        const result = await executeQuery(query, [email], "user", "select", true);
        if (result && result.user) {
            const isPasswordValid = await compare(password, result.user.password);

            return isPasswordValid ? result : { user: null };
        }

        return { user: null };
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostById = async (hostId) => {
    const query = "SELECT email, first_name, last_name FROM owner WHERE owner_id = $1"
    try {
        const result = await executeQuery(query, [hostId], "user", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getRenterById = async (renterId) => {
    const query = "SELECT email, first_name, last_name FROM renter WHERE renter_id = $1"
    try {
        const result = await executeQuery(query, [renterId], "user", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVans = async () => {
    const query = "SELECT * FROM van"
    try {
        const result = await executeQuery(query, [], "vans")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getAvailableVansForHost = async (hostId) => {
    const query = `
            SELECT v.van_id, v.owner_id, v.name, v.price, v.description, v.image_url, v.type
            FROM van v
            JOIN owner o ON v.owner_id = o.owner_id
            WHERE v.owner_id != $1
        `
    try {
        const result = await executeQuery(query, [hostId], "vans")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getAvaliableVansForRenter = async () => {
    const query = `
            SELECT v.van_id, v.owner_id, v.name, v.price, v.description, v.image_url, v.type
            FROM van v
            WHERE v.van_id NOT IN (SELECT r.van_id
                FROM rental r
                WHERE NOW() BETWEEN r.start_date AND r.end_date
            )
        `
    try {
        const result = await executeQuery(query, [], "vans")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVanById = async (vanId) => {
    const query = "SELECT * FROM van WHERE van_id = $1"
    try {
        const result = await executeQuery(query, [vanId], "van", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVanByName = async (name) => {
    const query = "SELECT * FROM van WHERE name = $1"
    try {
        const result = await executeQuery(query, [name], "van", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getVanByNameExcludingId = async (vanId, name) => {
    const query = "SELECT * FROM van WHERE van_id != $1 AND name = $2"
    try {
        const result = await executeQuery(query, [vanId, name], "van", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostVans = async (hostId) => {
    const query = "SELECT * FROM van WHERE owner_id = $1"
    try {
        const result = await executeQuery(query, [hostId], "hostVans")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostVanById = async (hostId, vanId) => {
    const query = "SELECT * FROM van WHERE owner_id = $1 AND van_id = $2"
    try {
        const result = await executeQuery(query, [hostId, vanId], "hostVan", "select", true)
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostRentedVans = async (hostId) => {
    const query = `
            SELECT r.rental_id, r.van_id, r.total_cost, r.placed_date, r.start_date, r.end_date 
            FROM rental r
            JOIN van v ON r.van_id = v.van_id
            WHERE v.owner_id = $1
        `
    try {
        const result = await executeQuery(query, [hostId], "hostRentedVans")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getHostReviews = async (hostId) => {
    const query = `
            SELECT r.van_id, r.date, u.first_name, u.last_name, r.rating, r.description 
            FROM review r
            JOIN (
                SELECT email, first_name, last_name FROM renter
                UNION
                SELECT email, first_name, last_name FROM owner
            ) u ON r.email = u.email
            JOIN van v ON r.van_id = v.van_id
            WHERE v.owner_id = $1
        `
    try {
        const result = await executeQuery(query, [hostId], "hostReviews")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const getUserRentals = async (email) => {
    const query = `
            SELECT r.rental_id, r.email, v.van_id, v.name, v.image_url, v.type, r.total_cost, r.start_date, r.end_date
            FROM rental r 
            JOIN van v on r.van_id = v.van_id
            WHERE email = $1
        `
    try {
        const result = await executeQuery(query, [email], "rentals")
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

// INSERTS

export const insertOwner = async (email, password, firstName, lastName) => {
    const query = "INSERT INTO owner (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)"
    try {
        const hashedPassword = await hash(password, 10);
        const result = await executeQuery(query, [email, hashedPassword, firstName, lastName], "host", "insert");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertRenter = async (email, password, firstName, lastName) => {
    const query = "INSERT INTO renter (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)"
    try {
        const hashedPassword = await hash(password, 10);
        const result = await executeQuery(query, [email, hashedPassword, firstName, lastName], "renter", "insert");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertRental = async (vanId, email, totalCost, startDate, endDate) => {
    const query = "INSERT INTO rental (van_id, email, total_cost, start_date, end_date) VALUES ($1, $2, $3, $4, $5)"
    try {
        const result = await executeQuery(query, [vanId, email, totalCost, startDate, endDate], "rental", "insert");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertReview = async (email, vanId, rating, description) => {
    const query = "INSERT INTO review (email, van_id, rating, description) VALUES ($1, $2, $3, $4)"

    try {
        const result = await executeQuery(query, [email, vanId, rating, description], "review", "insert");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

export const insertVan = async (hostId, name, type, price, description, imageURL) => {
    const query = "INSERT INTO van (owner_id, name, price, description, image_url, type) VALUES ($1, $2, $3, $4, $5, $6)"
    
    try {
        const result = await executeQuery(query, [hostId, name, price, description, imageURL, type], "van", "insert");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

// UPDATES
export const updateVan = async (vanId, name, type, price, description, imageURL) => {
    const query = `
            UPDATE van
            SET name = $1, price = $2, description = $3, image_url = $4, type = $5
            WHERE van_id = $6
            RETURNING van_id
        `
    
    try {
        const result = await executeQuery(query, [name, price, description, imageURL, type, vanId], "van", "update");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

// DELETES

export const deleteVan = async (vanId) => {
    const query = "DELETE FROM van WHERE van_id = $1"
    try {
        const result = await executeQuery(query, [vanId], "van", "delete");
        return result
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}