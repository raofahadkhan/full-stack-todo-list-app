"use client";
import { NewTodo } from "@/lib/drizzle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddTodo = () => {
	const [task, setTask] = useState<NewTodo | null>(null);
	const { refresh } = useRouter();
	const handleSubmit = async () => {
		try {
			if (task) {
				const res = await fetch("/api/todo", {
					method: "POST",
					body: JSON.stringify({ task: task.task }),
				});
				console.log(res.ok);
				refresh();
			}
			setTask(null);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form className="w-full flex gap-x-3 ">
				<input
					type="text"
					className="rounded-full w-full py-3.5 px-5 focus:outline-secondary border"
					onChange={(e) => setTask({ task: e.target.value })}
				/>
				<button
					type="button"
					className="p-4 rounded-full shrink-0 bg-gradient-to-b from-primary to-secondary"
					onClick={() => handleSubmit()}
				>
					<Image src={"/vector.png"} alt="vector" width={20} height={20} />
				</button>
			</form>
		</div>
	);
};

export default AddTodo;
