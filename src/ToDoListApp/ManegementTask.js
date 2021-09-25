import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'antd';
import { doneTaskAction, editTaskAction, removeTaskAction, searchTaskAction } from '../redux/actions/TaskListAction';
import TaskUpdate from './TaskUpdate';

export default function ManegementTask() {

    const { taskList, taskEdit } = useSelector(state => state.TaskListReducer)
    // console.log('edit', taskEdit)
    const [state, setState] = useState({ arrayCheck: [] })

    const dispatch = useDispatch()



    //render Task to do
    const renderTaskToDo = () => {
        return taskList.filter(item => item.status === false).map((item, index) => {
            if (item.id === taskEdit.id) {
                return <TaskUpdate key={index} taskEdit = {taskEdit} />
            }
            return <div className="d-flex justify-content-between border border-danger p-2 mb-2" style={{ borderRadius: '10px' }} key={index}>
                <div>
                    <Checkbox onChange={onChange} name={item.id} defaultChecked={false} ><span className="text-danger" style={{ fontSize: '20px' }}>{item.taskName}</span></Checkbox>
                </div>
                <div>
                    <button className="btn btn-info mr-3" onClick={() => {
                        dispatch(editTaskAction(item))
                    }}>Detail</button>
                    <button className="btn btn-danger" onClick={() => {
                        let arr = []
                        arr.push(item.id)
                        dispatch(removeTaskAction(arr))
                    }}>Remove</button>
                </div>
            </div>
        })
    }
    // console.log("arr", state.arrayCheck)



    //Render task Done
    const renderTaskDone = () => {
        return taskList.filter(item => item.status === true).map((item, index) => {
            return <div className="d-flex justify-content-between border border-success p-2 mb-2" style={{ borderRadius: '10px' }} key={index}>
                <div>
                    <span className="text-success" style={{ fontSize: '20px' }}>{item.taskName}</span>
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => {
                        let arr = []
                        arr.push(item.id)
                        dispatch(removeTaskAction(arr))
                    }}>Remove</button>
                </div>
            </div>
        })
    }

    //Bulk Action

    const onChange = (e) => {
        // console.log(`checked = ${e.target.checked}`);
        // console.log('id',e.target.name)
        let id = e.target.name
        let arr = [...state.arrayCheck]
        let index = arr.findIndex(item => item === id)
        if (e.target.checked) {
            arr.push(id)
        } else {
            if (index !== -1) {
                arr.splice(index, 1)
            }
        }
        setState({
            arrayCheck: arr
        })


    }

    const searchRef = useRef(null);
    const handleSearch = (e) =>{
        // console.log(e.target.value)
        if(searchRef.current){
            clearTimeout(searchRef.current)
          }

          searchRef.current = setTimeout(()=>{
            // dispatch(get_user_action(value))
            dispatch(searchTaskAction(e.target.value))
          },400)
    }
   


    return (
        <div className="d-flex justify-content-center">
            <div className="w-50">
                <h2 className="font-weight-bold mb-5 text-center">To Do List</h2>
                <div className="form-group">
                    <label className="text-success" style={{ fontSize: "15px" }}>Search tasks</label>
                    <input type="text" className="form-control" placeholder="Search..." required name="searchTask" onChange={handleSearch} />
                </div>
                <h4 className="text-danger mt-5">Task To Do</h4>
                <div>
                    {renderTaskToDo()}
                </div>
                <hr style={{ borderWidth: '2px', marginTop: '55px' }} />
                <h4 className="text-success mt-5">Task Done</h4>
                <div>
                    {renderTaskDone()}
                </div>
                <div className="d-flex justify-content-between border border-dark p-3" style={{ marginTop: "100px" }} >
                    <div>
                        <span className="text-warning " style={{ fontSize: '25px' }}>Bulk Action: </span>
                    </div>
                    <div>
                        <button className="btn btn-info mr-3" onClick={() => {
                            dispatch(doneTaskAction(state.arrayCheck))
                            window.location.reload()
                        }}>Done</button>
                        <button className="btn btn-danger" onClick={() => {
                            // console.log(state.arrayCheck)
                            dispatch(removeTaskAction(state.arrayCheck))
                            window.location.reload()
                        }}>Remove</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
