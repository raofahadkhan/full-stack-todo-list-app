import { QueryResult, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { NewTodo, Todo, db, todoTable } from "@/lib/drizzle";

export async function GET(request: NextRequest) {
	try {
		await sql`CREATE TABLE IF NOT EXISTS Todos(id SERIAL, Task varchar(255));`;

		const res = await db.select().from(todoTable);

		return NextResponse.json({ data: res });
	} catch (err) {
		console.log((err as { message: string }).message);
		return NextResponse.json({ message: (err as { message: string }).message });
	}
}

export async function POST(request: NextRequest) {
	const req = await request.json();

	try {
		if (req.task) {
			const res = db
				.insert(todoTable)
				.values({
					task: req.task,
				})
				.returning()
				.execute();
			console.log({ res });

			return NextResponse.json({ message: "Task added successfully" });
		} else {
			throw new Error("Task feild is required");
		}
	} catch (error) {
		return NextResponse.json({
			message: (error as { message: string }).message,
		});
	}
}
