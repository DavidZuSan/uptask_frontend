import { Task } from "@/types/index";
import { statusTranslations } from "@/locales/es";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

type GroupedTasks = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyle: { [key: string]: string } = {
  pending: "border-t-zinc-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-orange-500",
  completed: "border-t-teal-500",
};

export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="grid gap-5 overflow-x-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="w-full">
            <h3
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyle[status]}`}
            >
              {statusTranslations[status]}
            </h3>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
