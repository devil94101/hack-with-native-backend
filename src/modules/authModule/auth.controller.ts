import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { SignupEmailDto } from './dto/signupEmail.dto';
import { GoogleSignInDto } from './dto/googleSignin.dto';

@Controller()
export class AuthController {


  constructor(private readonly authService: AuthService) { }

  @Get('')
  async check(@Res() res: FastifyReply){
    return res.status(400).send('hello');
  }

  @Post('signupByEmail')
  async signup(@Body() body: SignupEmailDto, @Res() res: FastifyReply) {
    let response = await this.authService.signupWithEmail({
      name: body.name,
      email: body.email,
      password: body.password
    });

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }

  }

  @Post('googleSignIn')
  async googleSignIn(@Body() body: GoogleSignInDto, @Res() res: FastifyReply) {

    let response = await this.authService.signInUsingToken(body.accessToken);

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }

  }

  @Get('getUserDetails')
  async userDetails(@Res() res: FastifyReply){

    let response = await this.authService.getUserDetails();

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  }

}
