import { inject, Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { PopupService } from '../popupService/popup.service';
import { backendUrl } from '../../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;
  private popUpService = inject(PopupService)
  constructor() {}

  connect(token: string) {
    if (this.socket) {
      this.disconnect();
    }
    console.log("token inside socket");
    console.log(token);
    const config: SocketIoConfig = {
      url: `ws://${backendUrl}`,
      options: {
        transports: ['websocket'], // Force WebSocket transport only
        query: {
          authorization: token,
        },
      },
    };

    this.socket = new Socket(config);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('api', (data: any) => {
      this.handleIncomingMessage(data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  private handleIncomingMessage(data: any) {
    console.log("had incoming message!!");
    console.log(data);
    this.popUpService.show(data.msg);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
