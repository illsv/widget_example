"use client";

import React, { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [adults, setAdults] = useState<number>(0);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3003/widgets/boom_search?location=${location}&adults=${adults}`)
      .then((res) => res.json())
      .then((res) => setOutput(JSON.stringify(res)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    return res;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeRequest();
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl">Search</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-row text-black">
        <div>
          <label htmlFor="location">Location</label>
          <input onChange={(e) => setLocation(e.target.value)} id="location" value={location}></input>
        </div>
        <div>
          <label htmlFor="adults">Adults</label>
          <input onChange={(e) => setAdults(Number(e.target.value))} id="adults" value={adults}></input>
        </div>
        <div>
          <button disabled={loading} className="p-2 px-4 bg-slate-700">
            Search
          </button>
        </div>
      </form>
      <div>{output}</div>
    </div>
  );
}
