import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OtherTicketService } from 'src/app/shared/services/other-ticket.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit, OnDestroy {
  ticketType = 'normal'
  ticket: any;
  subscription: Subscription;
  queryParamsPubscription: Subscription;
  date = new Date();

  constructor(
    private titleService: Title,
    private routes: ActivatedRoute,
    private ticketService: TicketService,
    private otherTicketService: OtherTicketService,
    private toastr: ToastrService,
    public dateTimeHelper: DateTimeHelper,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.loadTicket();
  }

  loadTicket() {
    this.subscription = this.routes.params.subscribe((params) => {
      const ticketId = params.id;
      this.titleService.setTitle('Imprimir recibo - ' + ticketId);
      this.queryParamsPubscription = this.routes.queryParams.subscribe(async (params) => {

        if (params && params.type === 'other') {
          this.ticketType = 'other'
          this.ticket = await this.otherTicketService.get(ticketId).toPromise();
        } else {
          this.ticket = await this.ticketService.getTicket(ticketId).toPromise();
        }
      });
    }, () => {
      this.toastr.error('Error', 'Hubo un error al preparar los datos para imprimir')
    });
  }

  print() {
    window.print();
  }
}
