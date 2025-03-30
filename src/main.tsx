
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use concurrent mode features by not disabling
createRoot(document.getElementById("root")!).render(<App />);
