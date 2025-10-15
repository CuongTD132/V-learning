
export interface RegisterTypes {
    id: string;
    desc: string;
    fullName: string;
    phone: string;
    email: string;
    course?: string;
    content?: string;
    expectedMessage: string;
    checkReset?: boolean;
}