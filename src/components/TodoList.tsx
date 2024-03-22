// "use client";
import BASE_PATH from "@/lib/basepath";
import { Todo } from "@/lib/drizzle";
import DeleteTodo from "./DeleteTodo";

const getData = async () => {
  try {
    const res = await fetch(`${BASE_PATH}/api/todo`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const TodoList = async () => {
  const res: { data: Todo[] } = await getData();

  return (
    <div className="max-h-[450px] overflow-scroll mb-4">
      {res &&
        res.data.reverse().map((item) => {
          return (
            <div
              key={item.id}
              className="bg-gray-100 py-4 px-4 flex items-center justify-between  shadow rounded-lg my-3"
            >
              <div className="flex items-center gap-x-3">
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
                <p className="text-lg font-medium">{item.task}</p>
              </div>
              <DeleteTodo todoId={item.id} />
            </div>
          );
        })}
    </div>
  );
};
export default TodoList;
