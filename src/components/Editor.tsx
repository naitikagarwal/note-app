import { useState, useEffect } from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import type { AppData, Page } from '../types/types';
// import Toolbar from './Toolbar';
import TiptapEditor from './TiptapEditor';
import { format } from 'date-fns';
interface EditorProps {
  activePage: Page | null;
  updatePage: (page: Page) => void;
}

export default function Editor({ activePage, updatePage }: EditorProps) {
  const [content, setContent] = useState('');


  useEffect(() => {
    if (activePage) {
      setContent(activePage.content);
    }
  }, [activePage]);

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
          <div className="flex-1 overflow-auto p-0">
            <TiptapEditor
              content={content}
              onChange={(newContent) => updatePage({
                ...activePage,
                content: newContent,
                updatedAt: Date.now(),
              })}
            />
          </div>
          {/* timestamp */}
          <div className="sticky bottom-0 bg-background border-t p-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3 w-3" />
                <span>
                  Created: {format(new Date(activePage.createdAt), 'MMM d, yyyy - h:mm a')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>
                  Updated: {format(new Date(activePage.updatedAt), 'MMM d, yyyy - h:mm a')}
                </span>
              </div>
            </div>
          </div>

        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select or create a page to start editing
        </div>
      )}
    </div>
  );
}