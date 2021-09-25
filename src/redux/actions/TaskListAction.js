import { ADD_NEW_TASK, DONE_TASK, EDIT_TASK, REMOVE_TASK, SEARCH_TASK, UPDATE_TASK } from "../types/TaskListReducer";

export const addNewTaskAction = (newTask) => ({
    type: ADD_NEW_TASK,
    newTask : newTask
})

export const doneTaskAction = (arrTaskDone) => ({
    type : DONE_TASK,
    arrTaskDone : arrTaskDone
})


export const removeTaskAction = (arrTaskRemove) =>({
    type :REMOVE_TASK,
    arrTaskRemove : arrTaskRemove
})

export const editTaskAction = (taskEdit) =>({
    type : EDIT_TASK,
    taskEdit : taskEdit
})

export const updateTaskAction = (taskUpdate) =>({
    type : UPDATE_TASK,
    taskUpdate : taskUpdate
})

export const searchTaskAction = (taskName) =>({
    type : SEARCH_TASK,
    taskName : taskName
})