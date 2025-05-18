import { useState, useEffect, useRef } from 'react';
import type { AppData, Page } from '../types/types';
import Toolbar from './Toolbar';

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
      <Toolbar
        onBold={() => handleFormat('bold')}
        onItalic={() => handleFormat('italic')}
        onCreateFolder={createFolder}
        disabled={!activePage}
        isBoldActive={isBold}
        isItalicActive={isItalic}
      />
      
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
          
          <input
            type="text"
            value={activePage.content}
            onChange={(e) => updatePage({
              ...activePage,
              content: e.target.value,
              updatedAt: Date.now(),
            })}
            className="p-4 overflow-auto focus:outline-none"
            placeholder="Content"
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