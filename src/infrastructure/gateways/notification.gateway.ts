import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { INotificationService } from '../../domain/services/notification.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'notifications',
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect, INotificationService {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(NotificationGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} joining room for user ${userId}`);
    client.join(`user_${userId}`);
  }

  /**
   * Sends a notification to all connected clients.
   */
  broadcast(event: string, payload: any): void {
    if (this.server) {
      this.server.emit(event, payload);
    }
  }

  /**
   * Sends a notification to a specific user.
   */
  sendToUser(userId: string, event: string, payload: any): void {
    if (this.server) {
      this.server.to(`user_${userId}`).emit(event, payload);
    }
  }

  /**
   * Allow clients to join a specific room (e.g., user_{id})
   */
  joinRoom(client: Socket, room: string): void {
    client.join(room);
  }
}
