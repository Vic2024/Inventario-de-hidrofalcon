import { ZodIssue } from "zod";
import type { NewErrors } from "~/types";
const handlerZodErrors = (errors: ZodIssue[]) => {
    const newErrors: NewErrors = {}
    errors.forEach(err => newErrors[err.path[0]] = err.message)
    return newErrors
}

export default handlerZodErrors  