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
      const res = await db
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

export async function DELETE(request: NextRequest) {
  // Parsing the URL to get the query parameter 'id'
  const url = new URL(request.url);
  const id = url.searchParams.get("id"); // Extract the 'id' query parameter

  if (!id) {
    // If 'id' is not provided, return an error response
    return NextResponse.json(
      { message: "Todo id is required" },
      { status: 400 }
    );
  }

  try {
    // Convert 'id' to an integer to match the expected data type in the database
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      // If 'id' is not a valid number, return an error response
      return NextResponse.json({ message: "Invalid todo id" }, { status: 400 });
    }

    // Perform a parameterized query to safely delete the specified record by 'id'
    const res = await sql`
            DELETE FROM TODOS WHERE id = ${numericId}
        `;

    // Check if the operation affected any rows (optional, adjust based on your setup)
    // Assuming the operation is successful if no exception was thrown
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error:any) {
    console.error("Error details:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
    // Parsing the URL to get the 'id' query parameter
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    // Validating the presence of 'id'
    if (!id) {
        return NextResponse.json({ message: "Todo id is required" }, { status: 400 });
    }

    // Parsing and validating the request body
    let reqBody;
    try {
        reqBody = await request.json();
    } catch (err) {
        return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const { task } = reqBody;
    if (!task) {
        return NextResponse.json({ message: "New task is required" }, { status: 400 });
    }

    try {
        // Assuming 'id' is an integer, parsing it to ensure correct data type
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return NextResponse.json({ message: "Invalid todo id" }, { status: 400 });
        }

        // Update the todo item in the database
        const res = await sql`
            UPDATE TODOS
            SET task = ${task}
            WHERE id = ${numericId}
        `;

        // You might need to adjust this depending on your SQL library's behavior
        // and how it indicates successful updates or no-ops (e.g., no matching row)
        return NextResponse.json({ message: "Todo updated successfully" });
    } catch (error: any) {
        console.error("Error details:", error);
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}

