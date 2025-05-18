import './App.css'
import Sidebar from './components/sidebar'
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {

  const { data, saveData } = useLocalStorage();

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
        collapsed={data.settings.sidebarCollapsed} 
        toggleCollapse= {toggleSidebar} />
    </>
  )
}


export default App
