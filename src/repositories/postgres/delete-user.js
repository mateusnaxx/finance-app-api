import { postgresHelper } from '../../db/postgres/helper'

export class PostgresDeleteUser {
    async execute(userId) {
        const deleteUser = await postgresHelper.query(
            `DELETE FROM users 
            WHERE id = $1 
            RETURNING *`,
            [userId],
        )
        return deleteUser[0]
    }
}
