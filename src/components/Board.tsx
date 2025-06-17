'use client';
import { useState, useEffect } from 'react';
import PostIt from './PostIt';
import { v4 as uuidv4 } from 'uuid';
import { fetchConnections, insertConnection, deleteConnection } from '../lib/connectionApi'
import {insertNote, deleteNote, fetchNotes, updateNote} from '../lib/noteApi'




type Note = {
  id: string;
  x: number;
  y: number;
  text: string;
};

type Connection = {
  id: string;
  fromId: string;
  toId: string;
};

export default function Board() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const loadNotesAndConnections = async () => {
        const [notesData, connectionsData] = await Promise.all([
        fetchNotes(),
        fetchConnections(),
        ])
        console.log('🔥 loaded connections:', connectionsData);
        setNotes(notesData)
        setConnections(connectionsData)
    }

    loadNotesAndConnections()
    }, [])



  const createNote = async () => {
    const newNote: Note = {
      id: uuidv4(),
      x: 100 + notes.length * 20,
      y: 100 + notes.length * 20,
      text: 'New note',
    };
    setNotes((prev) => [...prev, newNote]);
    await insertNote(newNote)
  };

  const updateNotePosition = async (id: string, x: number, y: number) => {
    setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
    await updateNote(id, { x, y });
    };

  const updateNoteText = async (id: string, newText: string) => {
    setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
    await updateNote(id, { text: newText });
    };


  const handleNoteClick = async (id: string) => {
    if (selectedId === null) {
        setSelectedId(id)
    } else if (selectedId !== id) {
        const newConnection: Connection = {
        id: uuidv4(),
        fromId: selectedId,
        toId: id,
        }
        setConnections((prev) => [...prev, newConnection])
        setSelectedId(null)

        await insertConnection(newConnection)
    } else {
        setSelectedId(null)
    }
    }

  const getNoteById = (id: string) => notes.find((n) => n.id === id);

  const handleDeleteNote = async (id: string) => {
    // 1. หา connection ที่เกี่ยวข้องทั้งหมด
    const relatedConnections = connections.filter((c) => c.fromId === id || c.toId === id);

    // 2. ลบ connection ทั้งใน Supabase และ local
    for (const c of relatedConnections) {
        await deleteConnection(c.id);
    }

    // 3. ลบจาก state
    setConnections((prev) => prev.filter((c) => c.fromId !== id && c.toId !== id));
    setNotes((prev) => prev.filter((note) => note.id !== id));

    // 4. ลบ note จริงจาก DB
    await deleteNote(id);
    };

  const handleDeleteConnection = async (id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
    await deleteConnection(id);
    };



  return (
    <div className="relative w-full h-screen bg-[#fefae0] overflow-hidden">
      <button
        onClick={createNote}
        className="absolute top-4 left-4 bg-orange-400 text-white px-4 py-2 rounded shadow hover:bg-orange-500 z-50"
      >
        + New Post-it
      </button>

      {/* เส้น SVG ด้านล่าง */}
      <svg className="absolute w-full h-full z-0 pointer-events-none">
        {connections.map((conn) => {
          const from = getNoteById(conn.fromId);
          const to = getNoteById(conn.toId);
          if (!from || !to) return null;
          const x1 = from.x + 80;
          const y1 = from.y + 80;
          const x2 = to.x + 80;
          const y2 = to.y + 80;
          return (
            <g key={conn.id}>
                <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="gray"
                strokeWidth={4}
                strokeLinecap="round"
                className="pointer-events-auto"
                onClick={() => handleDeleteConnection(conn.id)}
                />
            </g>
          );
        })}
      </svg>

      {/* Render Note */}
      {notes.map((note) => (
        <PostIt
          key={note.id}
          id={note.id}
          x={note.x}
          y={note.y}
          text={note.text}
          onDrag={updateNotePosition}
          onClick={handleNoteClick}
          onTextChange={updateNoteText}
          onDelete={handleDeleteNote}
        />
      ))}
    </div>
  );
}
