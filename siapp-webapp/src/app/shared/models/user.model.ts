export class User {

    id: number;
    username: string;
    password: string;
    roles: [{}];
    active: boolean;
    therapist: {
        id: number;
        last_name: string;
        name: string;
        phone: string;
        second_last_name: string;
        speciality: string;
    };

}
