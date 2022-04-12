import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTypeDataService } from 'src/app/shared/services/data/service-type-data.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { OtherTicketService } from 'src/app/shared/services/other-ticket.service';
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
    concept: null,
    ticketType: 'all',
  };

  constructor(
    public dateTimeHelper: DateTimeHelper,
    public userDataService: UserDataService,
    public ticketService: TicketService,
    public otherTicketService: OtherTicketService,
    public serviceTypeDataService: ServiceTypeDataService,
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
        customHeaderActions: [
          {
            text: 'Agregar Recibo (Otros)',
            action: 'addOtherTicket',
            value: 'addOtherTicket',
            iconClass: {
              'fa-plus': true
            },
            buttonClass: {
              'btn-info': true
            }
          }
        ]
      }
    }];

  }

  executeAction({value, action}) {
    const ticketType = value.record ? 'ticket' : 'other-ticket'; 
    switch (action) {
      case 'view':
        this.viewTicket(value, ticketType);
        break;
      case 'edit':
        this.editTicket(value, ticketType);
        break;
      case 'print':
        this.printTicket(value, ticketType);
        break;
      case 'addOtherTicket':
        this.router.navigate(['home', 'add-other-ticket']);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }
  }

  viewTicket(ticket: any, ticketType) {
    this.router.navigate(['home', 'view-' + ticketType, ticket.id]);
  }

  editTicket(ticket: any, ticketType) {
    this.router.navigate(['home', 'edit-' + ticketType, ticket.id]);
  }

  printTicket(ticket: any, ticketType) {
    let queryParams;
    if (ticketType === 'other-ticket') {
      queryParams = { queryParams: { type: 'other' } }
    }
    let newRelativeUrl = this.router.createUrlTree(['print-ticket/' + ticket.id], queryParams);
    let baseUrl = window.location.href.replace(this.router.url, '');
    window.open(baseUrl + newRelativeUrl, '_blank');
  }

  async updateFilters(value, key: string) {
    this.filters[key] = value;
    await this.filterTickets();
  }

  async filterTickets() {
    let params = this.buildFilters();
    let data = [];

    try {
      if (this.filters.ticketType === ITicketType.TIKCET) {
        data = await this.ticketService.filterTickets(params).toPromise();
      } else if (this.filters.ticketType === ITicketType.OTHER_TICKET) {
        data = await this.otherTicketService.filterTickets(params).toPromise();
      } else {
        let normalTickets = await this.ticketService.filterTickets(params).toPromise();
        let otherTickets = await this.otherTicketService.filterTickets(params).toPromise();
        data = normalTickets.concat(otherTickets);
      }
    } catch (error) {
      console.log(error);
    }

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

  }

  buildFilters(): HttpParams {
    const {
      startDate,
      endDate,
      therapist,
      status,
      ticketId,
      recordId,
      concept,
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
      concept: concept
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
      let personName;
      let recordId;
      let therapistName = '';
      let date = new Date(ticket.createdAt.replace('-', '/'));
      let transformedDate = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');

      // Normal tickets are assigned to a record
      if (ticket.record) {
        personName = `${ticket.record.person.name} ${ticket.record.person.lastName}`,
        recordId = ticket.record.id;
        therapistName = `${ticket.therapist.name} ${ticket.therapist.last_name}`;
      } else {
      // Otherwise it is other ticket data
        personName = `${ticket.name} ${ticket.lastName}`,
        recordId = 'NA'
        for (const therapist of ticket.therapists) {
          therapistName = therapistName + `${therapist.name} ${therapist.last_name} / `;
        }
        therapistName = therapistName.substr(0, therapistName.length - 3);
      }
      return {
        ...ticket,
        tableFields: [
          ticket.id,
          recordId,
          personName,
          therapistName,
          ticket.serviceType.label,
          `$${ticket.total}.00`,
          ticket.status,
          transformedDate
        ]
      }
    });
  }
}

enum ITicketType {
  ALL = 'all',
  TIKCET = 'ticket',
  OTHER_TICKET = 'otherTicket',
} 