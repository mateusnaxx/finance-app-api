import { ZodError } from 'zod'
import { updateTransactionSchema } from '../../schemas/index.js'
import {
    badRequest,
    checkIfIdIsValid,
    InvalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'
export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const params = httpRequest.body

            await updateTransactionSchema.parseAsync(params)

            const transaction = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.issues[0].message
                return badRequest({ message: errorMessage })
            }
            console.error(error)

            return serverError()
        }
    }
}
