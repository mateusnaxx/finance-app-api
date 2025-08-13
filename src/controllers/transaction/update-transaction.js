import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    InvalidIdResponse,
    invalidTypeResponse,
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

            const allowedFields = ['name', 'data', 'amount', 'type']
            const someFieldsNotAllowed = Object.keys(params).some(
                (fields) => !allowedFields.includes(fields),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const transaction = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            console.error('Error updating transaction:', error)

            return serverError()
        }
    }
}
