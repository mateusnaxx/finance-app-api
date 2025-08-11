import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = [] //[first_name = $1, last_name = $2]
        const updateValues = [] // [Mateus, Almeida]

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateFields.length + 1}`)
            updateValues.push(updateUserParams[key])
        })

        updateValues.push(userId)

        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE id = $${updateFields.length + 1}
            RETURNING *;
        `

        // 'first_name = $1, last_name = $2'

        const updateUser = await postgresHelper.query(updateQuery, updateValues)
        return updateUser[0]
    }
}
