import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private nickname:string;

  constructor(
    private router : Router, 
    public route : ActivatedRoute, 
    private wss: WebsocketService) { }

  ngOnInit() {
    this.guardSupervsion();
  }

  onGetIn() { 
    this.onNavigate();
    this.onAddPlayers();
  }
  guardSupervsion() {
    if(this.nickname !== undefined) {
      this.onNavigate();
    }
  }

  onNavigate() {
    this.router.navigate(['/game', this.nickname], {relativeTo: this.route, skipLocationChange: true});
  }

  onAddPlayers() {
    this.wss.onAddPlayers(this.nickname);
  }

}
