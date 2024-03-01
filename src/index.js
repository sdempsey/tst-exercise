import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);
