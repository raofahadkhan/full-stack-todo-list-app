import { Todo } from "@/lib/drizzle";

const getData = async () => {
	try {
		const res = await fetch("http:/localhost:3000/api/todo", {
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
			{res && res.data.map((item) => {
				return (
					<div
						key={item.id}
						className="bg-gray-100 py-4 px-4 flex items-center gap-x-3 shadow rounded-lg my-3"
					>
						<div className="h-3 w-3 bg-secondary rounded-full"></div>
						<p className="text-lg font-medium">{item.task}</p>
					</div>
				);
			})}
		</div>
	);
};
export default TodoList;
