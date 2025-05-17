import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Folder, Search } from 'lucide-react';


export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes based on search query


  return (
    <aside className={`w-64 transition-all duration-300 border-r bg-white`}>
      <div className="p-4 space-y-4">
        <Button variant="ghost"  className="p-2">
          <Folder className="h-5 w-5" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Render folders and notes here */}
      </div>
    </aside>
  );
}