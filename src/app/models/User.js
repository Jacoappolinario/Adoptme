const db = require('../../config/db')

module.exports = {
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            // WHERE | OR | AND
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
                //SELECT * FROM users WHERE email = 'mayk@gmail.com'
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    }
}