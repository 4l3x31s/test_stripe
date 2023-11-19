/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
//const stripe = require('stripe')('sk_test_51G4UQuAVZlKdFsVfF1Aag4n7GFdGvvWnnZmR9VGqx2malGmWVPBIOb3LaGrgHBTDHJEkpJEjvPJ8eFMABMFFwRVV00muuJdByA');
import Stripe from 'stripe';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/create-checkout-session')
  async pagarStripe(@Body() data: {amount: number, title: string}){
    
    try {
      console.log(data);
      const stripe = new Stripe('sk_test_51G4UQuAVZlKdFsVfF1Aag4n7GFdGvvWnnZmR9VGqx2malGmWVPBIOb3LaGrgHBTDHJEkpJEjvPJ8eFMABMFFwRVV00muuJdByA',{
        apiVersion: '2023-08-16'
      });
      //console.log(stripe);
      // const session = await stripe.checkout.sessions.create({
      //   line_items: [
      //     {
      //       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //       price: '{{PRICE_ID}}',
      //       quantity: 1,
      //     },
      //   ],
      //   mode: 'payment',
      //   success_url: `http://localhost:4200/success`,
      //   cancel_url: `http://localhost:4200/cancel.html`,
      // });
      const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      locale:'en',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.title,
            },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://localhost:4200/success',
      cancel_url:  'https://localhost:4200/cancel',
    });
    console.log('********************')

    console.log(session);

    return {url: session.url}
    } catch (error) {
      console.log(error)
      return error;
    }
    
  }
}
