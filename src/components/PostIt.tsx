'use client';
import { useState, useRef } from 'react';

type Props = {
  id: string;
  x: number;
  y: number;
  text: string;
  onDrag: (id: string, x: number, y: number) => void;
  onClick: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
};

export default function PostIt({ id, x, y, text, onDrag, onClick, onTextChange, onDelete }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - x,
      y: e.clientY - y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    onDrag(id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (text === 'New note') {
    setInputText('');
  }
  setIsEditing(true);
};

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(id, inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      onTextChange(id, inputText);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => onClick?.(id)}
      onDoubleClick={handleDoubleClick}
      className="absolute w-40 h-40 bg-pink-400 p-4 rounded shadow-md cursor-move select-none text-black shadow-lg"
      style={{ left: x, top: y }}
    >
      {isEditing ? (
        <textarea
          autoFocus
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full resize-none bg-pink-400 rounded p-1 outline-none border-none focus:ring-0 focus:outline-none"
        />
      ) : (
        <div className="whitespace-pre-wrap">{text}</div>
      )}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-1 right-2 text-stone-600 font-normal z-10"
        >
        ✕
        </button>
    </div>
  );
}
