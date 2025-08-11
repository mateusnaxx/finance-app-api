import {
    checkIfIdIsValid,
    InvalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return InvalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return notFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
