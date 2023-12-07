export const getPublicId = (imageURL) => {
    try {
        const urlParts = imageURL.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        return publicId;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
}

export const bufferToDataUri = (buffer, mimetype = 'application/octet-stream') => {
    const base64String = buffer.toString('base64');
    return `data:${mimetype};base64,${base64String}`;
};

const handleQueryResults = (resolve, reject, error, results, key, operation, fetchOne) => {
    if (error) {
        reject(error);
    } else {
        if (operation === "insert" || operation === "update" || operation === "delete") {
            // For inserts, updates and deletes, resolve with a success message
            const response = `${operation} successful for ${key}`
            resolve(response);
        } else {
            // For selects, resolve with the data
            const data = results.rows;

            if (data && data.length > 0) {
                const response = { [key]: fetchOne ? data[0] : data };
                resolve(response);
            } else {
                const response = { [key]: null };
                resolve(response);
            }
        }
    }
};

import connection from "../db/connection.js";

export const executeQuery = async (query, values, key, operation = "select", fetchOne = false) => {
    const client = await connection.connect();
    try {
        const results = await client.query(query, values);
        return new Promise((resolve, reject) => {
            handleQueryResults(resolve, reject, null, results, key, operation, fetchOne);
        });
    } catch (err) {
        console.error(err);
        return new Promise((resolve, reject) => {
            handleQueryResults(resolve, reject, err, null, key, operation, fetchOne);
        });
    } finally {
        client.release();
    }
};