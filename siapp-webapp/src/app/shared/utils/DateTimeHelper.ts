import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelper {

    constructor() {}

    getTodayDate(): Date {
        return new Date();
    }

    calculateEndDate(startDate: Date, duration: number) {
        debugger;
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

    calculateMinutesOfDuration(string) {

        
    }

};