export interface Book {
    title: string;
    author: string;
    genres?: string[];
    publishedYear: number;
    summary?: string;
    publisher: string;
    totalCopies: number;
    availableCopies: number;
    id: string;
}
