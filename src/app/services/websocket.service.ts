import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebsocketService {

    private serverUrl = "http://localhost:11101/game";
    private stompClient;

    private users = new BehaviorSubject<any[]>([]);
    castUsers = this.users.asObservable();

    private verdict = new BehaviorSubject<any[]>([]);
    castVerdict = this.verdict.asObservable();

    private reset = new BehaviorSubject<boolean>(false);
    castReset = this.reset.asObservable();

    constructor() {
        this.setupConnection();
    }

    setupConnection() {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function (frame) {

            that.stompClient.subscribe("/challenge/players", (message) => {
                if (message.body) {
                    that.users.next(JSON.parse(message.body));
                }
            });

            that.stompClient.subscribe("/challenge/result", (message) => {
                if (message.body) {
                    that.verdict.next(JSON.parse(message.body));
                }
            });

            that.stompClient.subscribe("/challenge/resetsettings", (message) => {
                if (message.body) {
                    that.reset.next(message.body);
                }
            });

        });
    }

    onAddPlayers(message) {
        this.stompClient.send("/app/send/player", {}, message);
    }

    onChalenge(player, figure) {
        this.stompClient.send("/app/send/figure", {}, JSON.stringify({'player':player, 'figure':figure}));
    }

    onResetContest() {
        this.stompClient.send("/app/send/reset", {});
    }
}