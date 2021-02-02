const db = require('../../config/db')

module.exports = {
    create(data) {
        const query = `
            INSERT INTO pets (
                category_id,
                user_id,
                name,
                description,
                status
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `

        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.status || 1
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT * FROM pets WHERE id = $1`, [id])
    },
    update(data) {
        const query = `
            UPDATE pets SET
                category_id=($1),
                user_id=($2),
                name=($3),
                description=($4),
                status=($5)
            WHERE id = $6
        `

        const values = [
            data.category_id,
            data.user_id,
            data.name,
            data.description,
            data.status,
            data.id
        ]

        return db.query(query, values)
    },
    files(id) {
        return db.query(`
        SELECT * FROM files WHERE pet_id = $1
        `, [id])
    }
}