"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const initialImages = [
  {
    id: 1,
    src: "/next.svg",
    tag: "hng one",
  },
  {
    id: 2,
    src: "/next.svg",
    tag: "hng two",
  },
  {
    id: 3,
    src: "/next.svg",
    tag: "hng three",
  },
  {
    id: 4,
    src: "/next.svg",
    tag: "hng four",
  },
];

export default function Home() {
  const [characters, updateCharacters] = useState(initialImages);

  const dragSection = useRef<number | null>(null);
  const draggedOverSection = useRef<number | null>(null);

  function handleDragStart(index: number) {
    dragSection.current = index;
  }

  function handleDragEnter(index: number) {
    if (dragSection.current !== null) {
      draggedOverSection.current = index;
    }
  }

  function handleSort() {
    if (dragSection.current !== null && draggedOverSection.current !== null) {
      const charactersClone = [...characters];
      const temp = charactersClone[dragSection.current];
      charactersClone[dragSection.current] =
        charactersClone[draggedOverSection.current];
      charactersClone[draggedOverSection.current] = temp;
      updateCharacters(charactersClone);
      dragSection.current = null;
      draggedOverSection.current = null;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      <h1 className="text-xl font-bold mt-4">List</h1>
      {characters.map(({ id, src, tag }, index) => (
        <div
          className="relative flex space-x-3 border rounded p-2 bg-gray-100"
          key={id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleSort}
          onTouchStart={() => handleDragStart(index)}
          onTouchMove={() => handleDragEnter(index)}
          onTouchEnd={handleSort}
        >
          <Image width={100} height={100} src={src} alt={tag} />
          <p>{tag}</p>
        </div>
      ))}
    </main>
  );
}
