import { ADD_NEW_TASK, DONE_TASK, EDIT_TASK, REMOVE_TASK, SEARCH_TASK, UPDATE_TASK } from "../types/TaskListReducer"

let taskListDefault = []

if (localStorage.getItem('LIST_TASK')) {
    taskListDefault = JSON.parse(localStorage.getItem('LIST_TASK'))
}

const initialState = {
    taskList : taskListDefault,
    taskEdit : ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_TASK :{
            state.taskList.push(action.newTask)
            state.taskList.sort((a,b) =>  new Date(b.dueDate) - new Date(a.dueDate))
            localStorage.setItem('LIST_TASK', JSON.stringify(state.taskList))
            return {...state}
        }
        case DONE_TASK :{
            // console.log('a',action.arrTaskDone)
            let arrTaskNew = [...state.taskList]
            arrTaskNew.map((item,index) =>{
                if(action.arrTaskDone.includes(item.id)){
                    item.status = true
                    return item
                }else{
                    return item
                }
            })
            state.taskList = arrTaskNew
            localStorage.setItem('LIST_TASK', JSON.stringify(state.taskList))
            return {...state}
        }
        case REMOVE_TASK :{
            // console.log('a',action.arrTaskRemove)
            let arrTaskNew = [...state.taskList]
           
            for(let item of action.arrTaskRemove){
                arrTaskNew.forEach((task, index) =>{
                    if(item === task.id){
                        arrTaskNew.splice(index, 1)
                    }
                })
            }

            state.taskList = arrTaskNew
            localStorage.setItem('LIST_TASK', JSON.stringify(state.taskList))
            return {...state}
        }
        case EDIT_TASK : {
            return {...state, taskEdit : action.taskEdit}
        }
        case UPDATE_TASK :{
            let index = state.taskList.findIndex(item => item.id === action.taskUpdate.id)
            if(index !== -1){
                state.taskList[index] = action.taskUpdate
            }
            state.taskEdit = ''
            localStorage.setItem('LIST_TASK', JSON.stringify(state.taskList))
            return {...state}
        }
        case SEARCH_TASK :{
            // console.log(action.taskName)
            let arrayNew = JSON.parse(localStorage.getItem('LIST_TASK'))
            // console.log(arrayNew)
            let arraySearch = arrayNew.filter(item => item.taskName.toLowerCase().includes(action.taskName.toLowerCase()))
            // console.log(arraySearch)
            state.taskList = arraySearch
            return {...state}
        }
    default:
        return state
    }
}
