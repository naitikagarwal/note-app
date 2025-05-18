import { ChevronLeft, ChevronRight, Plus, Folder as FolderIcon } from 'lucide-react';
import { Button } from './ui/button';
import type { Folder, Page } from '@/types/types';

interface SidebarProps{
  folders: Folder[];
  pages: Record<string, Page>;
  collapsed: boolean;
  toggleCollapse: () => void;
  onCreatePage: (folderId?: string) => void;
  onSelectPage: (pageId: string) => void;
  onSelectFolder: (folderId: string) => void;
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
  onSelectFolder,
  activePageId,
  activeFolderId,
}: SidebarProps) {
  

  
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
          onClick={() => onCreatePage()}
        >
          <Plus size={14} className="" />
          {!collapsed && "New Page"}
        </Button>
      </div>
      
    </div>
  );
}