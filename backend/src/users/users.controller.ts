import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import {
  RequestCreateDto,
  RequestUpdateDto,
  RequestUpdateManagerDto,
  RequestUpdatePersonalInfoDto,
  RequestUpdateQuantificationDto,
  RequestUpdatesSkillDto,
} from './dto/request.dto';
import { ResponseUserDto } from './dto/response.dto';
import { UsersService } from './users.service';

@ApiTags('FROS/ユーザー処理')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/me')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async getUserMe(@Body() request: { uid: string }): Promise<ResponseUserDto> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.getUser(request.uid);
  }

  @Post('/')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async createUser(@Body() request: RequestCreateDto): Promise<void> {
    return this.usersService.createUser(request);
  }

  @Put('/')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async updateUser(@Body() request: RequestUpdateDto): Promise<void> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.updateUser(request);
  }
  @Put('/personalInfo')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async updatePersonalInfo(@Body() request: RequestUpdatePersonalInfoDto): Promise<void> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.updatePersonalInfo(request);
  }

  @Put('/skills')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async updateSkills(@Body() request: RequestUpdatesSkillDto): Promise<void> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.updateSkills(request);
  }
  @Put('/qualification')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async updateQualification(@Body() request: RequestUpdateQuantificationDto): Promise<void> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.updateQualification(request);
  }

  @Put('/manager')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async updateManager(@Body() request: RequestUpdateManagerDto): Promise<void> {
    const isExistUser = await this.usersService.isExistUser(request.uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.updateManager(request);
  }

  @Get('/:uid')
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  async getUser(@Param('uid') uid: string): Promise<ResponseUserDto> {
    const isExistUser = await this.usersService.isExistUser(uid);
    if (!isExistUser) throw new NotFoundException();
    return this.usersService.getUser(uid);
  }
}
