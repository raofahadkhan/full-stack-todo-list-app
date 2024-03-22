"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiDeleteBin3Fill } from "react-icons/ri";

const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetch(`/api/todo?id=${todoId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to Delete Todo");

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const DeleteTodo: React.FC<{ todoId: number }> = ({ todoId }) => {
  const router = useRouter();
  return (
    <RiDeleteBin3Fill
      className="cursor-pointer"
      onClick={() => {
        deleteTodo(todoId);
        router.refresh();
      }}
    />
  );
};

export default DeleteTodo;