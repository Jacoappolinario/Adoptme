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
    },
    async delete(id) {
        try {
            //Consulta a image
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            // Apaga da pasta Images
            fs.unlinkSync(file.path)

            //Apaga a imagem da tabela de files
            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch(err) {
            // Se tiver algum erro ele retorna
            console.log(err)
        }
    }
}