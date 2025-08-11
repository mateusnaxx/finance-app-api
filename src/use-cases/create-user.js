import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        //gerar ID do usuario
        const userId = uuidv4()

        //criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório para criar o usuário
        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
