export interface Author {
    id: string;
    fullname: string;
    biography?: string;
}

export interface NewAuthor {
    fullname: string;
    biography?: string;
}