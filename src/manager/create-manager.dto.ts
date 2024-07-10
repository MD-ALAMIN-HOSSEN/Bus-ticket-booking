export class CreateManagerDto {
    readonly info: {
        name: string;
        username: string;
        phoneNumber: string;
        dateOfBirth: Date;
        profilePhoto: string;
    };
}
