import { ZodError } from 'zod/v4';
import { $ZodIssue } from 'zod/v4/core';

export default class ValidationError extends ZodError {
    customMessage: string;
    constructor(issue: $ZodIssue[]) {
        super(issue);
        this.customMessage = `Invalid: ${issue[0].path} - ${issue[0].message}`;
    }
}
