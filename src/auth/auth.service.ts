import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt'
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async regitser(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword
        })

        return("User registeration successfull")
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)

        if(!user) {
            throw new UnauthorizedException('Email not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            throw new UnauthorizedException('Password does not match')
        }

        const payload = {
            sub: user._id,
            role: user.role,
            email: user.email
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async registerAdmin(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const admin =  await this.usersService.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: Role.ADMIN
        })

        return{message: "Admin created successfully", admin}
    }
}