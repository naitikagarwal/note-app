export interface Page {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  name: string;
  pages: string[];
  createdAt: number;
}

export interface AppData {
  pages: Record<string, Page>;
  folders: Record<string, Folder>;
  settings: {
    activePage?: string;
    activeFolder?: string;
    sidebarCollapsed: boolean;
  };
}