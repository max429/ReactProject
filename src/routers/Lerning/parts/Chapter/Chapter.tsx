import React, {FC} from 'react';
import {Task, TaskType} from "../Task/Task";
import './Chapter.css'
import {IChapter} from "../../../../interfaces/chapters.interface";
import {IUser} from "../../../../interfaces/test.interface";

interface IProps {
    data: IChapter;
    index: number;
    userData: IUser;
}

export const Chapter: FC<IProps> = ({data, index, userData}) => {
    const isEven = index % 2 === 0;
    let offsetDirection = isEven ? 'right' : 'left';
    const {tasks, name, id} = data;

    return (<div className={'chapter'}>
        <div className={'chapter__header'}>
            <span>Раздел {index + 1}</span>
            <span className={'chapter__header-name'}>{name}</span>
        </div>
        {tasks.map((task, taskIndex) => {
            const {passedTasks, currentTask} = userData;
            let offset = 60;
            if ((isEven && offsetDirection === 'right' || !isEven && offsetDirection === 'left') &&
                taskIndex % 4 === 3 ||
                (!isEven && offsetDirection === 'right' || isEven && offsetDirection === 'left') &&
                taskIndex % 3 === 1) {
                offset = 20
            }
            const margin = (taskIndex % 4) * (offsetDirection === 'left' ? -offset : offset)
            let type: TaskType = 'locked';

            if (!passedTasks?.length && !index && !taskIndex ||
                currentTask.taskId === task.id && currentTask.chapterId === id) {
                type = 'current';
            }  else if (passedTasks?.length) {
                for (let i = 0; i < passedTasks.length; i++) {
                    if (passedTasks[i].taskId === task.id &&
                        passedTasks[i].chapterId === id) {
                        type = 'passed';
                    }
                }
            }
            return (<Task margin={margin} index={taskIndex} key={task.id} type={type}/>)
        })}
    </div>)

}
