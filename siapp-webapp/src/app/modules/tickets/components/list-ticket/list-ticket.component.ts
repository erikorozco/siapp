import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
import {
  TICKET_CONST as TicketConstants
} from 'src/app/shared/utils/ticket.constants';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  ticketConstants = TicketConstants;
  isFilterHidden = false;
  tickets: any;
  tableProperties: any;
  total = 0;
  filters = {
    startDate: null,
    endDate: null,
    therapist: null,
    status: null,
    serviceType: [],
    ticketId: null,
    recordId: null,
    notes: null
  };

  constructor(
    public dateTimeHelper: DateTimeHelper,
    public userDataService: UserDataService,
    public ticketService: TicketService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.filters.startDate = this.dateTimeHelper.getTodayDateString();
    this.filters.endDate = this.dateTimeHelper.getTodayDateString();
    this.initTable();
    this.filterTickets();
  }

  initTable() {
    this.tickets = {};
    this.tableProperties = [{
      headElements: ['No. Recibo', 'No. Expediente', 'Paciente', 'Terapeuta', 'Concepto', 'Total $', 'Estado', 'Fecha', 'Acciones'],
      datasource: [],
      maxVisibleItems: 20,
      filterFunction : this.parseFunction,
      tableActions: {
        hideSearchBox: true,
        view: true,
        edit: true,
        print: true,
        add: {
          route: ['/home', 'add-ticket'],
          text: 'Agregar Recibo'
        },
      }
    }];

  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.viewTicket(value);
        break;
      case 'edit':
        this.editTicket(value);
        break;
      case 'print':
        this.printTicket(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }
  }

  viewTicket(ticket: any) {
    this.router.navigate(['home', 'view-ticket', ticket.id]);
  }

  editTicket(ticket: any) {
    this.router.navigate(['home', 'edit-ticket', ticket.id]);
  }

  printTicket(ticket: any) {
    let newRelativeUrl = this.router.createUrlTree(['print-ticket', ticket.id]);
    let baseUrl = window.location.href.replace(this.router.url, '');
    window.open(baseUrl + newRelativeUrl, '_blank');
  }

  updateFilters(value, key: string) {
    this.filters[key] = value;
    this.filterTickets();
  }

  filterTickets() {
    let params = this.buildFilters();
    this.ticketService.filterTickets(params).toPromise().then((data) => {
      this.total = 0;
      for (const ticket of data) {
        if (ticket.status === 'NORMAL') {
          this.total = this.total + ticket.total;
        }
      }

      let [tableProperites] = this.tableProperties;
      const newTableProperites = {
        ...tableProperites,
        datasource: data,
      };
      this.tableProperties = [newTableProperites];
    }, (error) => {
      console.log(error);
    });
  }

  buildFilters(): HttpParams {
    const {
      startDate,
      endDate,
      therapist,
      status,
      ticketId,
      recordId,
      notes,
      serviceType,
    } = this.filters;
    let filters = {
      startDate,
      endDate,
      therapistId: therapist ? therapist.therapist.id : null,
      status,
      serviceType: serviceType.join(','),
      id: ticketId,
      recordId,
      concept: notes
    }
    if (ticketId) {
      filters = {
        id: ticketId
      } as any;
    }
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return params;
  }

  parseFunction(tickets) {
    return tickets.map((ticket) => {
      const datePipe: DatePipe = new DatePipe('es-MX');
      let date = new Date(ticket.createdAt);
      let transformedDate = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
      return {
        ...ticket,
        tableFields: [
          ticket.id,
          ticket.record.id,
          `${ticket.record.person.name} ${ticket.record.person.lastName}`,
          `${ticket.therapist.name} ${ticket.therapist.last_name}`,
          ticket.serviceType,
          `$${ticket.total}.00`,
          ticket.status,
          transformedDate
        ]
      }
    });
  }
}
