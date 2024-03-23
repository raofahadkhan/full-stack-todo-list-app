import BASE_PATH from "@/lib/basepath";
import { Todo } from "@/lib/drizzle";
import DeleteTodo from "./DeleteTodo";

// Custom styles for the scrollbar:
const customScrollbarStyles = `
  /* Width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

async function getData() {
  try {
    const response = await fetch(`${BASE_PATH}/api/todo`, {
      cache: "no-store",
    });
    if (!response.ok) {
      // If the response is not okay, throw an error to catch it below
      throw new Error("Failed to fetch the data");
    }
    const result = await response.json();
    return result; // This will include the { data: [] } structure
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow to handle it in the calling context
  }
}

const TodoList = async () => {
  try {
    const res: { data: Todo[] } = await getData();
    return (
      <>
        <style>{customScrollbarStyles}</style>
        <div className="h-[450px] overflow-y-auto mb-4">
          {res.data.length === 0 ? (
            <h3 className="flex justify-center my-auto">No Todos Found!</h3>
          ) : (
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
            })
          )}
        </div>
      </>
    );
  } catch (error) {
    return <div>Error Fetching Todos.</div>;
  }
};
export default TodoList;
