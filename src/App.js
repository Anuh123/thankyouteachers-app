import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherPage from './components/TeacherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:slug" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
