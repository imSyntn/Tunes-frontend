import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './App.css'
// import '../public/style.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
