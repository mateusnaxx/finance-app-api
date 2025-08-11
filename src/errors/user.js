export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User not found: ${userId}`)
        this.name = 'UserNotFoundError'
    }
}
