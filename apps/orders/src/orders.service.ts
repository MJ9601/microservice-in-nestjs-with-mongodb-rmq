import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderRequest } from './dtos/createOrderRequest.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(payload: CreateOrderRequest) {
    return this.orderRepository.create(payload);
  }

  async getAllOrders() {
    return this.orderRepository.find({});
  }
}
