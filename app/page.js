'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [count, setCount] = useState(100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-gray-800">Counter App</h1>

      <div className="text-6xl font-semibold text-blue-600">{count}</div>

      <Button 
        onClick={() => setCount(count + 1)}
        className="text-lg px-6 py-3"
      >
        Increment Count
      </Button>

       <div className="mt-10 text-center text-gray-600 text-base">
        <p>We have two pages available:</p>
        <p><strong>→</strong> <code>localhost:3000/user</code></p>
        <p><strong>→</strong> <code>localhost:3000/admin</code></p>
      </div>
    </div>
  );
}
