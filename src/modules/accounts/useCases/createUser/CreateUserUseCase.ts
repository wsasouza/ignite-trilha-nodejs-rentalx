import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";
@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) {}

  async execute({
      name,       
      password, 
      email, 
      driver_license
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists" );
    }

    await this.usersRepository.create({
      name,      
      password: passwordHash,
      email,
      driver_license
    });
  }
}

export { CreateUserUseCase };