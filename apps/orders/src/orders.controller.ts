import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dtos/createOrderRequest.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrderHandler(@Body() payload: CreateOrderRequest) {
    return this.ordersService.createOrder(payload);
  }

  @Get()
  async getAllOrdersHandler() {
    return this.ordersService.getAllOrders();
  }
}
