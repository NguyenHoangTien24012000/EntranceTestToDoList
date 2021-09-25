import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTaskAction } from '../redux/actions/TaskListAction';

export default function TaskUpdate(props) {

    const {taskEdit} = props
    // console.log(taskEdit)
    const [state, setState] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        priority: '',
    })

    useEffect(() => {
        setState({
            taskName: taskEdit.taskName,
            description: taskEdit.description,
            dueDate: moment(taskEdit.dueDate),
            priority: taskEdit.priority,
        })
    }, [taskEdit])

    const dispatch = useDispatch()

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }
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

    const upDateTask = (e) => {
        e.preventDefault();
        let taskUpDate = {
            id: taskEdit.id,
            taskName: state.taskName,
            description: state.description,
            dueDate: state.dueDate,
            priority: state.priority,
            status : false
        }
        // console.log(taskUpDate)
        // console.log(state.dueDate)
        dispatch(updateTaskAction(taskUpDate))
    
    
    }

    return (
        <div className="border border-danger p-2 mb-2" style={{ borderRadius: '10px' }} >
            <h4 className="font-weight-bold mb-5 text-center">Update Task</h4>
            <form className="w-full" onSubmit={upDateTask}>
                <div className="form-group">
                    <label className="text-success" style={{ fontSize: "15px" }}>Task Name</label>
                    <input type="text" className="form-control" placeholder="Enter User name" required name="taskName" value={state.taskName} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                    <label className="text-success " style={{ fontSize: "15px" }}>Description</label>
                    <textarea className="form-control" placeholder="Enter Description" value={state.description} required name="description" onChange={onChangeValue}></textarea>
                </div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label className="text-success " style={{ fontSize: "15px" }}>Due Date</label>
                        <DatePicker
                            name="dueDate"
                            className="form-control"
                            disabledDate={disabledDate}
                            onChange={onChangeDueDate}
                            value={state.dueDate}
                            defaultValue={state.dueDate}
                             format='YYYY/MM/DD'
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label className="text-success " style={{ fontSize: "15px" }}>Priority</label>
                        <select className="form-control" value={state.priority} name="priority" onChange={onChangeValue}>
                            <option value="1">Low</option>
                            <option value="2">Normal</option>
                            <option value="3">High</option>
                        </select>
                    </div>

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success w-full form-control mt-5">Update</button>
                </div>
            </form>
        </div>
    )
}
