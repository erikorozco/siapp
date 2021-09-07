import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit, OnDestroy {
  ticket: any;
  subscription: Subscription;
  date = new Date();

  constructor(
    private titleService: Title,
    private routes: ActivatedRoute,
    private ticketService: TicketService,
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
    this.subscription = this.routes.params.subscribe(async (params) => {
      const ticketId = params.id;
      this.titleService.setTitle('Imprimir recibo - ' + ticketId);
      this.ticket = await this.ticketService.getTicket(ticketId).toPromise();
      // this.print();
    }, () => {
      this.toastr.error('Error', 'Hubo un error al preparar los datos para imprimir')
    });
  }

  print() {
    window.print();
  }
}
