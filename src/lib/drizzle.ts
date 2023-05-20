import { InferModel } from "drizzle-orm";
import {
	pgTable,
	serial,
	text,
	varchar,
	timestamp,
	boolean,
} from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const todoTable = pgTable("Todos", {
	id: serial("id").primaryKey(),
	task: varchar("Task", { length: 255 }).notNull(),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">;

export const db = drizzle(sql);

