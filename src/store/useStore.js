import { create } from 'zustand';

const useStore = create((set, get) => ({
  windows: [],
  activeWindowId: null,
  startMenuOpen: false,
  
  openWindow: (app) => {
    const { windows } = get();
    const existingWindow = windows.find(w => w.id === app.id);
    
    if (existingWindow) {
      set({ activeWindowId: app.id });
      return;
    }
    
    const newWindow = {
      id: app.id,
      title: app.title,
      icon: app.icon,
      component: app.component,
      x: 100 + windows.length * 30,
      y: 100 + windows.length * 30,
      width: app.width || 600,
      height: app.height || 400,
      minimized: false,
      maximized: false,
    };
    
    set({ 
      windows: [...windows, newWindow], 
      activeWindowId: app.id,
      startMenuOpen: false 
    });
  },
  
  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindowId: state.windows.length > 1 
        ? state.windows.filter(w => w.id !== id)[0]?.id 
        : null
    }));
  },
  
  minimizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, minimized: true } : w
      ),
      activeWindowId: null
    }));
  },
  
  maximizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    }));
  },
  
  focusWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, minimized: false } : w
      ),
      activeWindowId: id
    }));
  },
  
  updateWindowPosition: (id, x, y) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, x, y } : w
      )
    }));
  },
  
  updateWindowSize: (id, width, height) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, width, height } : w
      )
    }));
  },
  
  toggleStartMenu: () => {
    set(state => ({ startMenuOpen: !state.startMenuOpen }));
  },
  
  closeStartMenu: () => {
    set({ startMenuOpen: false });
  }
}));

export default useStore;