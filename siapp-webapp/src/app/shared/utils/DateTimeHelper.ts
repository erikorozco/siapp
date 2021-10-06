import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelper {

    constructor() {}

    getTodayDate(): Date {
        return moment().toDate();
    }

    // input type date uses this format
    getTodayDateString(): string {
        let todayDate = this.getTodayDate().toString();
        todayDate = this.parseStringDateToStringMXDate(todayDate);
        return todayDate;
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

    /**
     * Parse hour time from UI format to hours
     * @param hour Example (815 | 915 | 900)
     */
    getHoursFromUIFormat(time: number): number {
        return  Math.floor(time / 100);
    }

    /**
     * Parse hour time from UI format to minutes
     * @param hour Example (815 | 930 | 900)
     * @returns  Example (815 -> 15 | 930 -> 30 | 900 -> 0)
     */
    getMinutesFromUIFormat(time: number) {
        return time % 100;
    }

    getHoursFromDate(date: Date): number {
        return date.getHours();
    }

    getMinutesFromDate(date: Date): number {
        return date.getMinutes();
    }

    parseStringToDate(date) {
        return moment(date).toDate();
    }

    /**
     * Parse date string to MX date 
     * @param hour Example (2021-02-02-10:30:00)
     * @returns  Example '2021-02-02'
     */
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

    buildTimeForUI(date: Date) {
        const hour = this.getHoursFromDate(date);
        const minutes = this.getMinutesFromDate(date);
        return (hour * 100) + minutes;
    }

    isDateGreaterThan(endDate: Date, startDate: Date): boolean {
        return endDate > startDate;
    }

    convertStringDateToMxText(stringDate) {
        const datePipe: DatePipe = new DatePipe('es-MX');
        let date = new Date(stringDate);
        let a = datePipe.transform(date, 'dd-MM-yyyy' ,'es-MX');
    }

    parseRercordDateToInputDateValue(date) {
        const datePipe: DatePipe = new DatePipe('es-MX');
        const a = new Date(date);
        let formattedDate =  datePipe.transform(date, 'yyyy-MM-dd' ,'es-MX')
        return formattedDate
      }

    calculateAge(recordBornDate): number {
        const bornDate = new Date(recordBornDate);
        const currentDate = new Date();
        const a = currentDate.getFullYear() - bornDate.getFullYear()
        let months = (a * 12) + (currentDate.getMonth() - bornDate.getMonth()) ;
        return Math.floor(months/12)
    }

};