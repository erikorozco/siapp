import { EventInput } from "@fullcalendar/core";

export class FullCalendarEventFactory {

    event: EventInput = {};

    constructor(data: ApiEvent, apiEventType: ApiEventType) {
        this.event.date = data.startDate;
        this.event.extendedProps = data;
        this.event.allDay = data.duration === "allDay" ?  true : false;
        this.event.type = apiEventType;
        
        if (data.endDate) {
            this.event.end = data.endDate
        }

        if (apiEventType === "agenda") {
            this.event.title = `${data.person.name} ${data.person.lastName} - ${data.notes ? data.notes : 'Sin asunto'}`;
            this.event.color = data.assisted ? '#1cc88a' : '#007bff';
        } else {
            this.event.title = `${data.notes ? data.notes : 'Sin asunto'}`;
            this.event.color = data.assisted ? '#1cc88a' : (data.type === IEventType.OPENNING ? '#BE33FF' : '#FFC300');
            // this.event.rendering = 'background';
        }

    }

    decode(): EventInput {
        return this.event;
    }

}

export enum ApiEventType {
    Agenda = 'agenda',
    Event = 'event',
}

interface ApiEvent {
    person?: {
        name: string;
        lastName: string;
    };
    notes: string;
    startDate: string | Date;
    endDate?: string | Date;
    assisted?: boolean;
    type?: IEventType; // It is used for differenciate between openings of regular events. Only used for event, not for appointments.
    duration: string; // Used only to check if it is all day event. The real duration is calculated by the start date and end date time info
}

export enum IEventType {
    OPENNING  = 'APERTURA',
    OTRO = 'OTRO',
}