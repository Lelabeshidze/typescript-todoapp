import { v4 as uuidV4 } from "uuid";
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addListItem(newTask);
  input.value = "";
});
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    savetasks();
  });
  checkBox.checked = task.completed;
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
}
function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
