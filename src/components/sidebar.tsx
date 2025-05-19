import { ChevronLeft, ChevronRight, Plus, Trash, Pencil, Folder as FolderIcon } from 'lucide-react';
import { Button } from './ui/button';
import type { Folder, Page } from '@/types/types';
import { useState } from 'react';
import PageItem from './PageItem';

interface SidebarProps{
  folders: Folder[];
  pages: Record<string, Page>;
  collapsed: boolean;
  toggleCollapse: () => void;
  onCreatePage: (folderId?: string) => void;
  onSelectPage: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
  onCreateFolder: () => void;
  onSelectFolder: (folderId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onDeleteFolder: (folderId: string) => void;
  activePageId?: string;
  activeFolderId?: string;
}

export default function Sidebar({
  folders,
  pages,
  collapsed,
  toggleCollapse,
  onCreatePage,
  onSelectPage,
  onDeletePage,
  onCreateFolder,
  onSelectFolder,
  onRenameFolder,
  onDeleteFolder,
  activePageId,
  activeFolderId,
}: SidebarProps) {
  
  const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
  
  return (
    <div className={`sidebar flex flex-col h-full border-r ${collapsed ? 'w-16 ' : 'w-64'}`}>
      <div className="p-4 border-b flex justify-between items-center">
        {!collapsed && <h2 className="font-bold">Notey</h2>}
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className='cursor-pointer'>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="p-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mb-2 cursor-pointer"
          onClick={() => onCreateFolder()}
        >
          <Plus size={14} className="" />
          {!collapsed && "New Folder"}
        </Button>
      </div>

      {!collapsed && (
        <div className="flex-1 overflow-auto">
          {folders.map((folder) => (
            <div key={folder.id} className="mb-2">
              <div 
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => onSelectFolder(folder.id)}
              >
                <FolderIcon size={16} className="mr-2" />
                {renamingFolder === folder.id ? (
                  <input
                    type="text"
                    defaultValue={folder.name}
                    onBlur={(e) => {
                      onRenameFolder(folder.id, e.target.value);
                      setRenamingFolder(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onRenameFolder(folder.id, e.currentTarget.value);
                        setRenamingFolder(null);
                      }
                    }}
                    autoFocus
                    className="flex-1 outline-none"
                  />
                ) : (
                  <span className="flex-1">{folder.name}</span>
                )}
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenamingFolder(folder.id);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFolder(folder.id);
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
              
              {activeFolderId === folder.id && (
                <div className="ml-6">
                  {folder.pages.map((pageId) => (
                    <PageItem
                      key={pageId}
                      onDelete={() => onDeletePage(pageId)}
                      page={pages[pageId]}
                      isActive={activePageId === pageId}
                      onClick={() => onSelectPage(pageId)}
                    />
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-1"
                    onClick={() => onCreatePage(folder.id)}
                  >
                    <Plus size={12} className="mr-1" />
                    Add Page
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}