const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({filename, path, pet_id}) {
        const query = `
            INSERT INTO files (
                name,
                path,
                pet_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            filename,
            path,
            pet_id
        ]

        return db.query(query, values)
    }
}