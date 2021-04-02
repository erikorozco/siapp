import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelper {

    constructor() {}

    getTodayDate(): Date {
        return new Date();
    }

    buildDateTime(startDate: Date, duration: number) : Date {
        const hours = duration >= 60 ? duration / 60 : 0; 
        const miniutes = duration%60;
        
        let totalHours = startDate.getHours() + hours;
        let totalMinutes = startDate.getMinutes() + miniutes;

        if (totalMinutes >= 60) {
            totalHours++;
            totalMinutes = totalMinutes - 60;
        }

        startDate.setHours(totalHours, totalMinutes, 0, 0)
        return startDate;
    }

    // appendTimeToDate(date: Date, minutes: number): Date {

    // }

    /**
     * Parse hour time from UI format to hours
     * @param hour Example (815 | 915 | 900)
     */
    getHoursFromUIFormat(time: number): number {
        return  Math.floor(time / 100);
    }

    getMinutesFromUIFormat(time: number) {
        return time % 100;
    }

    parseStringToDate(date) {
        return moment(date).toDate();
    }

    parseStringDateToStringMXDate(date: string): string {
        const newDate = moment(date).format('YYYY-MM-DD');
        return newDate.toString();
    }

    buildDateTimeForUI(targetDate: string, time: number): Date | null {
        let date = this.parseStringToDate(targetDate);
        date.setHours(this.getHoursFromUIFormat(time));
        date.setMinutes(this.getMinutesFromUIFormat(time));
        return date;
    }

    isDateGreaterThan(endDate: Date, startDate: Date): boolean {
        return endDate > startDate;
    }

};