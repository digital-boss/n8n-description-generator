export interface ITask {
	run: () => void;
}

export type Task = ITask | (() => void);

export class TasksContainer implements ITask {
	tasks: Task[];

	constructor(tasks: Task[]) {
		this.tasks = tasks;
	}

	run () {
		this.tasks.forEach(t => typeof t === 'function' ? t() : t.run());
	}
}