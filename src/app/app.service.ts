import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(username: string, password: string): Promise<void> {
    const user = await this.validateUser(username, password);

    if (user !== null) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = await bcrypt.hash(password, 10);
    await this.userRepository.insert(newUser);
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    if (!username || !password) {
      throw new BadRequestException('username and password must be non empty ');
    }

    return this.userRepository.findOne({
      where: { username, isDeleted: false },
    });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);

    if (user === null) {
      throw new NotFoundException('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    return this.jwtService.signAsync({ email: user.username });
  }
}
