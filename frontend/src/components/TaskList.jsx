import React from 'react'
import TasksEmptyState from './TasksEmptyState';
import TasksCard from './TasksCard';

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
    if (!filteredTasks || filteredTasks.length === 0) {
        return <TasksEmptyState filter={filter} />;
    }
    return (
        <div className='space-y-3'>
            {
                filteredTasks.map((task, index) => (
                    <TasksCard
                        key={task._id ?? index}
                        task={task}
                        index={index}
                        handleTaskChanged={handleTaskChanged}
                    />
                ))
            }
        </div>
    )
}
export default TaskList