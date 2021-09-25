import { REDIRECT_PAGE } from "../types/RedirectType"

const initialState = {
    page : '2'
}

export default (state = initialState, action) => {
    switch (action.type) {

     case REDIRECT_PAGE : {
    
         return {...state, page : action.key}
     }

    default:
        return state
    }
}
