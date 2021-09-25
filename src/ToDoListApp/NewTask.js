import { DatePicker } from 'antd'
import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { redirectPageAction } from '../redux/actions/RedirectAction';
import { addNewTaskAction } from '../redux/actions/TaskListAction';
export default function NewTask() {

    const [state, setState] = useState({
        taskName: '',
        description: '',
        dueDate: moment(),
        priority: 2
    })

    const dispatch = useDispatch()

    const onChangeValue = (e) => {
        // console.log(e.target.name,e.target.value)
        let { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
        // console.log(state)
    }
    const onChangeDueDate = (date, dateString) => {
        setState({
            ...state,
            dueDate: moment(date._d)
        })
    }

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

    const addTask = (e) => {
        e.preventDefault();
        let newTask = {
            id: Date.now(),
            taskName: state.taskName,
            description: state.description,
            dueDate: state.dueDate,
            priority: state.priority,
            status : false
        }
        // console.log(state.dueDate)
        dispatch(addNewTaskAction(newTask))
        dispatch(redirectPageAction('2'))
        setState({
            taskName: '',
            description: '',
            dueDate: moment(),
            priority: 2
        })    
    }
  


    return (
        <div className="d-flex justify-content-center">
            <div className="w-50">
                <h2 className="font-weight-bold mb-5 text-center">New Task</h2>
                <form className="w-full" onSubmit={addTask}>
                    <div className="form-group">
                        <label className="text-success" style={{ fontSize: "15px" }}>Task Name</label>
                        <input type="text" className="form-control" placeholder="Enter User name" required name="taskName" value={state.taskName} onChange={onChangeValue} />
                    </div>
                    <div className="form-group">
                        <label className="text-success " style={{ fontSize: "15px" }}>Description</label>
                        <textarea className="form-control" placeholder="Enter Description"  value={state.description}  required name="description" onChange={onChangeValue}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className="text-success " style={{ fontSize: "15px" }}>Due Date</label>
                            <DatePicker
                                name="dueDate"
                                className="form-control"
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                defaultValue={state.dueDate}
                                onChange={onChangeDueDate}
                                value = {state.dueDate}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="text-success " style={{ fontSize: "15px" }}>Priority</label>
                            <select className="form-control"  value={state.priority} name="priority" onChange={onChangeValue}>
                                <option value="1">Low</option>
                                <option value="2">Normal</option>
                                <option value="3">High</option>
                            </select>
                        </div>

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success w-full form-control mt-5">Add</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
