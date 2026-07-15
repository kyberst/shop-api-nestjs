export interface INotificationService {
  broadcast(event: string, payload: any): void;
  sendToUser(userId: string, event: string, payload: any): void;
}
