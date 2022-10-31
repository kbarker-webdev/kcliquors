import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';


const root = createRoot(document.getElementById('root'));

root.render(<App />);
