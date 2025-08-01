import { postgresHelper } from '../../db/postgres/helper'

export class postgresCreateUsersRepository {
    async execute(createUserParams) {
        //create users in postgres
        const results = await postgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                createUserParams.ID,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
                createUserParams.password,
            ],
        )

        return results[0] // Return the created user
    }
}
