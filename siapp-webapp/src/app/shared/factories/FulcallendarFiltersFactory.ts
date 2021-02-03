import { ApiEventType } from "./FullCalendarEventFactory";

export class FulcallendarFiltersFactory {

    // Config and Settings
    accessToken: String;
    apiEventType: String;

    // Filters
    therapist?: any;
    person?: any;
    version?: String | Number;
    assisted?: Boolean;
    notes?: Boolean;

    constructor(data: any,  apiEventType: ApiEventType, accessToken) {
        this.accessToken = accessToken;
        this.apiEventType = apiEventType;
        this.therapist = data.therapist;
        this.person = data.person;
        this.version = data.version;
        this.assisted = data.assisted;
        this.notes = data.notes;
    }

    decode(): FilterApiParams {
        let result = {
            access_token: this.accessToken,
            therapistId: this.therapist ? this.therapist.therapist.id : undefined,
            personId: this.person ? this.person.id : undefined,
            version: this.version ? this.version : undefined,
            assisted: this.assisted ? this.assisted : undefined,
            notes: this.notes ? this.notes : undefined,
        };

        if (this.apiEventType === ApiEventType.Event) {
            delete result.assisted;
            delete result.version;
            delete result.personId;
        }

        return result;
    }

}

export type FilterApiParams = {
    access_token?: String;
    therapistId?: String | Number;
    personId?: String | Number;
    version?: String | Number;
    assisted?: Boolean;
}