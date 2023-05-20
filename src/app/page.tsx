import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
	return (
		<main className="bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center">
			<div className="px-3 py-4 rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/60 backdrop-blur-xl w-full max-w-md ">
				{/* @ts-ignore */}
				<TodoList />
				<AddTodo />
				<div className="w-1/2 h-1.5 bg-black/80 rounded mx-auto mt-6 "></div>
			</div>
		</main>
	);
}
