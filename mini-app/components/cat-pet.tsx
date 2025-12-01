"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import "./cat-pet.css";

export default function CatPet() {
  const [breed, setBreed] = useState<"orange" | "gray" | "black" | "calico">("orange");
  const [counter, setCounter] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  // No toast hook needed; using sonner's toast function

  const breeds = {
    orange: "/cat-orange.png",
    gray: "/cat-gray.png",
    black: "/cat-black.png",
    calico: "/cat-calico.png",
  };

  const handlePet = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCounter((c) => c + 1);
    if (audioRef.current) audioRef.current.play();
    createHearts(e.clientX, e.clientY);
    createSparkles(e.clientX, e.clientY);
    showRandomMessage();
  };

  const createHearts = (x: number, y: number) => {
    const container = document.getElementById("heart-container");
    if (!container) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    container.appendChild(heart);
    setTimeout(() => container.removeChild(heart), 3000);
  };

  const createSparkles = (x: number, y: number) => {
    const container = document.getElementById("sparkle-container");
    if (!container) return;
    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${x + Math.random() * 40 - 20}px`;
      sparkle.style.top = `${y + Math.random() * 40 - 20}px`;
      container.appendChild(sparkle);
      setTimeout(() => container.removeChild(sparkle), 2000);
    }
  };

  const showRandomMessage = () => {
    const msgs = [
      "Your cat is so happy!",
      "Keep petting!",
      "Purr-fect!",
      "Meow! Love you!",
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMessages((m) => [...m, msg]);
    setTimeout(() => setMessages((m) => m.slice(1)), 4000);
  };

  useEffect(() => {
    if (counter > 0) {
      toast(`You petted the cat ${counter} time${counter > 1 ? "s" : ""}!`, {
        duration: 2000,
      });
    }
  }, [counter]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="relative">
        <div id="heart-container" className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />
        <div id="sparkle-container" className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />
        <img
          src={breeds[breed]}
          alt="Cat"
          className="w-[400px] h-[400px] object-contain cursor-pointer -scale-x-100"
          onClick={handlePet}
        />
        <audio ref={audioRef} src="https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/bell_ring.mp3" preload="auto" />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-xl font-semibold">Pet Count: {counter}</span>
        <Button variant="outline" size="sm" onClick={() => setCounter(0)}>
          Reset
        </Button>
      </div>
      <div className="mt-4 flex gap-2">
        {Object.keys(breeds).map((b) => (
          <Button
            key={b}
            variant={breed === b ? "default" : "outline"}
            size="sm"
            onClick={() => setBreed(b as "orange" | "gray" | "black" | "calico")}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center">
        {messages.map((m, i) => (
          <span key={i} className="text-lg text-muted-foreground">
            {m}
          </span>
        ))}
      </div>
    </main>
  );
}
