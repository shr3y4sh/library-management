import zod from 'zod/v4';

export const BookSchema = zod.object({
    title: zod.string(),
    author: zod.string(),
    genres: zod.string().array().optional(),
    publishedYear: zod.number(),
    summary: zod.string().optional(),
    publisher: zod.string(),
    totalCopies: zod.number(),
    availableCopies: zod.number(),
});

export type BookDetails = zod.infer<typeof BookSchema>;

export interface Book extends BookDetails {
    id: string;
}
