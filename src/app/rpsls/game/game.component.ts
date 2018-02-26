import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private nickname: string;
  private selectedFigure: string;
  private allUsers: any[];
  private oponent: string;
  private oponentFigure: string;
  private verdictMsg: string;

  figures = new Map([
    ["fig_01", "rock"],
    ["fig_02", "paper"],
    ["fig_03", "scissors"],
    ["fig_04", "lizard"],
    ["fig_05", "spock"]
  ]);

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private wss: WebsocketService) {
    this.route.params.subscribe(param => { this.nickname = param.name });
  }

  ngOnInit() {
    this.wss.castUsers.subscribe(users => this.allUsers = users);
    this.wss.castVerdict.subscribe(verdict => this.onVerdict(verdict));
    this.wss.castReset.subscribe(reset => this.onResetGameSettings());
  }

  onFigureHit(value) {
    this.selectedFigure = value;
  }

  onStartContest() {
    this.wss.onChalenge(this.nickname, this.selectedFigure);
  }

  onResetContest() {
    this.wss.onResetContest();
  }

  onResetGameSettings() {
    this.selectedFigure = null;
    this.oponent = null;
    this.oponentFigure = null;
    this.verdictMsg = null;
  }

  onVerdict(value) {
    if (value) {
      if (value.verdict == "tie") {
        this.verdictMsg = "There is the tie!";
        this.oponentFigure = value.firstFigure;
      } else {
        if (value.verdict == this.nickname) {
          this.verdictMsg = "You have won!";
          if (value.firstPlayer == this.nickname) {
            this.oponent = value.secondPlayer;
            this.oponentFigure = value.secondFigure
          } else {
            this.oponent = value.firstPlayer;
            this.oponentFigure = value.firstFigure
          }
        } else {
          this.verdictMsg = "You have lost!";
          if (value.firstPlayer == this.nickname) {
            this.oponent = value.secondPlayer;
            this.oponentFigure = value.secondFigure
          } else {
            this.oponent = value.firstPlayer;
            this.oponentFigure = value.firstFigure
          }
        }
      }
    }
  }

}
