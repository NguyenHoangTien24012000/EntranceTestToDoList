import React from 'react'
import NewTask from './NewTask'
import { Tabs } from 'antd';
import ManegementTask from './ManegementTask';
import { useDispatch, useSelector } from 'react-redux';
import { redirectPageAction } from '../redux/actions/RedirectAction';

const { TabPane } = Tabs;
export default function ToDoListApp() {
    const {page} = useSelector(state => state.RedirectReducer)
    const dispatch = useDispatch()
    const callback = (key) => {
        dispatch(redirectPageAction(key))
    }
    return (
        <div className="container">
            <Tabs  activeKey={page} onChange={callback}>
                <TabPane tab="New Task" key="1">
                    <NewTask />
                </TabPane>
                <TabPane tab="To Do List" key="2">
                    <ManegementTask />
                </TabPane>
            </Tabs>
        </div>
    )
}
