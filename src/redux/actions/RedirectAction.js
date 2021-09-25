import { REDIRECT_PAGE } from "../types/RedirectType";

export const redirectPageAction = (key) => ({
    type: REDIRECT_PAGE,
    key : key
})
