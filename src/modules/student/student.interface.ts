

// TODO: 1. Create interface
export type Guardian = {
    fatherName: string;
    fatherEmail: string;
    fatherPhone: string;
    fatherOccupation: string;
    motherName: string;
    motherEmail: string;
    motherPhone: string;
    motherOccupation: string;
}

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type Student = {
    id: string
    name: UserName
    gender: "male" | "female";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: "A+" | "AB+" | "B+" | "O+" | "A-" | "AB-" | "B-" | "O-";
    presentAddress: string
    permanentAddress: string
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string
    isActive: "active" | "blocked";
}



