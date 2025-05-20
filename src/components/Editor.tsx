import { useState, useEffect, useRef } from 'react';
import type { AppData, Page } from '../types/types';
// import Toolbar from './Toolbar';
import TiptapEditor from './TiptapEditor';

interface EditorProps {
  activePage: Page | null;
  updatePage: (page: Page) => void;
  createFolder: () => void;
}

export default function Editor({ activePage, updatePage, createFolder }: EditorProps) {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePage) {
      setContent(activePage.content);
    }
  }, [activePage]);

  const handleFormat = (format: 'bold' | 'italic') => {
    document.execCommand(format, false);
    if (format === 'bold') setIsBold(!isBold);
    if (format === 'italic') setIsItalic(!isItalic);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      if (activePage) {
        updatePage({
          ...activePage,
          content: newContent,
          updatedAt: Date.now(),
        });
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full ">
      
      {activePage ? (
        <>
          <input
            type="text"
            value={activePage.title}
            onChange={(e) => updatePage({
              ...activePage,
              title: e.target.value,
              updatedAt: Date.now(),
            })}
            className="text-2xl font-bold p-4 border-b"
            placeholder="Title"
          />
      <TiptapEditor
        content={content}
        onChange={(newContent: string) => updatePage({
              ...activePage,
              content: newContent,
              updatedAt: Date.now(),
            })}
        
      />

        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select or create a page to start editing
        </div>
      )}
    </div>
  );
}