const db = require('../../config/db')

module.exports = {
    create(data) {
        const query = `
            INSERT INTO pets (
                category_id,
                user_id,
                name,
                description,
                uf,
                city,
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.uf,
            data.city,
            data.status || 1
        ]

        return db.query(query, values)
    }
}