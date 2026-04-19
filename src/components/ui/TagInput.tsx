"use client";

import { useState } from "react";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  color?: "coral" | "teal";
  placeholder?: string;
};

export default function TagInput({
  tags,
  onChange,
  color = "coral",
  placeholder = "Add a skill, press Enter...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const colorVariants = {
    coral: "bg-coral-light text-coral-dark",
    teal: "bg-teal-light text-teal-dark",
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = inputValue.trim();

      // Don't add empty or duplicate tags
      if (!trimmed || tags.includes(trimmed)) {
        setInputValue("");
        return;
      }

      onChange([...tags, trimmed]);
      setInputValue("");
    }

    // Backspace on empty input removes last tag
    if (e.key === "Backspace" && inputValue === "") {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 items-center px-3 py-2 min-h-11 rounded-md border border-border bg-surface focus-within:ring-2 focus-within:ring-coral focus-within:outline-none">
      {tags.map((tag, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${colorVariants[color]}`}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="opacity-60 hover:opacity-100 transition-opacity leading-none"
          >
            ×
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-28 bg-transparent text-sm text-foreground placeholder:text-muted outline-none border-none"
      />
    </div>
  );
}
