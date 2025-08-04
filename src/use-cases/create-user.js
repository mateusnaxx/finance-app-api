import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUsersRepository } from '../repositories/postgres/create-users.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se e-mail ja existe
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

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
        const postgresCreateUserRepository = new PostgresCreateUsersRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
