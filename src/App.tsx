import './App.css'
import Sidebar from './components/sidebar'
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import type { AppData, Folder, Page } from './types/types';
import Editor from './components/Editor';

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

  const createFolder = () => {
    const newFolder: Folder = {
      id: uuidv4(),
      name: 'New Folder',
      pages: [],
      createdAt: Date.now(),
    };

    const newData: AppData = {
      ...data,
      folders: {
        ...data.folders,
        [newFolder.id]: newFolder,
      },
    };

    saveData(newData);
  };

  const updatePage = (page: Page) => {
    const newData: AppData = {
      ...data,
      pages: {
        ...data.pages,
        [page.id]: page,
      },
    };
    saveData(newData);
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

  const renameFolder = (folderId: string, newName: string) => {
    const newData: AppData = {
      ...data,
      folders: {
        ...data.folders,
        [folderId]: {
          ...data.folders[folderId],
          name: newName,
        },
      },
    };
    saveData(newData);
  };

  const deleteFolder = (folderId: string) => {
    const { [folderId]: _, ...remainingFolders } = data.folders;
    saveData({
      ...data,
      folders: remainingFolders,
    });
  };

  const deletePage = (pageId: string) => {
    const { [pageId]: _, ...remainingPages } = data.pages;
    const updatedFolders = Object.entries(data.folders).reduce(
      (acc, [folderId, folder]) => {
        return {
          ...acc,
          [folderId]: {
            ...folder,
            pages: folder.pages.filter((id) => id !== pageId),
          },
        };
      },
      {} as Record<string, Folder>
    );

    const newData: AppData = {
      ...data,
      pages: remainingPages,
      folders: updatedFolders,
      settings: {
        ...data.settings,
        activePage: data.settings.activePage === pageId ? undefined : data.settings.activePage,
      },
    };

    saveData(newData);
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
    <div className="flex h-screen">
      <div className={`flex flex-col border-r ${data.settings.sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar
          folders={Object.values(data.folders)}
          pages={data.pages}
          collapsed={data.settings.sidebarCollapsed}
          toggleCollapse={toggleSidebar}
          onCreatePage={createPage}
          onSelectPage={selectPage}
          onDeletePage={deletePage}
          onCreateFolder={createFolder}
          onSelectFolder={selectFolder}
          onRenameFolder={renameFolder}
          onDeleteFolder={deleteFolder}
          activePageId={data.settings.activePage}
          activeFolderId={data.settings.activeFolder}
        />
      </div>
      <div className="flex-1 overflow-auto">
        <Editor
          activePage={activePage}
          updatePage={updatePage}
        />
      </div>

    </div>
  )
}


export default App
