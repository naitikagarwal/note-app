import { ChevronLeft, ChevronRight, Plus, Folder as FolderIcon } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {

  collapsed: boolean;
  toggleCollapse: () => void;
}

export default function Sidebar({

  collapsed,
  toggleCollapse,
}: SidebarProps) {
  

  
  return (
    <div className={`flex flex-col h-full border-r ${collapsed ? 'w-16' : 'w-64'}`}>
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
        >
          <Plus size={14} className="" />
          {!collapsed && "New Page"}
        </Button>
      </div>
      
    </div>
  );
}