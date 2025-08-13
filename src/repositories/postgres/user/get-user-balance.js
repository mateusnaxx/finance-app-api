import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const balance = await postgresHelper.query(
            `SELECT earnings, expenses, investments, balance FROM view_user_balance
            WHERE user_id = $1`,
            [userId],
        )

        return {
            userId,
            ...balance[0],
        }
    }
}
