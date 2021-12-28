const initialData = {
    tasks: {
        'tasks-1': {
            id: 'task-1',
            content: 'Take out the garbage'
        },
        'tasks-2' : {
            id: 'task-2',
            content: 'Watch my favorite show'
        },
        'tasks-3': {
            id: 'task-3',
            content: 'Charge my phone'
        },
        'tasks-4': {
            id: 'task-4',
            content: 'Cook dinner'
        },
        columns: {
            id: 'column-1',
            title: 'To do',
            taskIds: [
                'task-1',
                'task-2',
                'task-3',
                'task-4'
            ]
        },
        columnOrder: ['column-1']
    }
}
export default initialData;