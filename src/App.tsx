import './App.css'
import Sidebar from './components/sidebar'
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import type { AppData, Page } from './types/types';

function App() {

  const { data, saveData } = useLocalStorage();

  const activePage = data.settings.activePage ? data.pages[data.settings.activePage] : null;
  const activeFolder = data.settings.activeFolder ? data.folders[data.settings.activeFolder] : null;

  const createPage = (folderId?: string) => {
    const newPage: Page = {
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const newData: AppData = {
      ...data,
      pages: {
        ...data.pages,
        [newPage.id]: newPage,
      },
      settings: {
        ...data.settings,
        activePage: newPage.id,
      },
    };
    
    if (folderId) {
      newData.folders = {
        ...data.folders,
        [folderId]: {
          ...data.folders[folderId],
          pages: [...data.folders[folderId].pages, newPage.id],
        },
      };
    }
    
    saveData(newData);
  };

  const selectPage = (pageId: string) => {
    saveData({
      ...data,
      settings: {
        ...data.settings,
        activePage: pageId,
      },
    });
  };

    const selectFolder = (folderId: string) => {
    saveData({
      ...data,
      settings: {
        ...data.settings,
        activeFolder: data.settings.activeFolder === folderId ? undefined : folderId,
      },
    });
  };

  const toggleSidebar = () => {
    saveData({
      ...data,
      settings: {
        ...data.settings,
        sidebarCollapsed: !data.settings.sidebarCollapsed,
      },
    });
  };

  return (
    <>
      <Sidebar 
        folders={Object.values(data.folders)}
        pages={data.pages}
        collapsed={data.settings.sidebarCollapsed} 
        toggleCollapse= {toggleSidebar} 
        onCreatePage={createPage}
        onSelectPage={selectPage}
        onSelectFolder={selectFolder}
        activePageId={data.settings.activePage}
        activeFolderId={data.settings.activeFolder}
      />
    </>
  )
}


export default App
