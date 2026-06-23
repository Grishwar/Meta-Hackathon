"use client";

import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

export default function TaskCards() {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="tasks" className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Available Tasks
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white text-black shadow-lg rounded-xl p-6 border border-gray-300"
          >
            <h3 className="font-bold text-xl text-black mb-2">
  {task.replaceAll("_", " ").toUpperCase()}
</h3>
          </div>
        ))}
      </div>
    </section>
  );
}