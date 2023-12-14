
import { Suspense } from 'react';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from './components/LoadingIndicator';
function App() {
  return (
    <>
       <Suspense fallback={<LoadingIndicator />}>
       <Main />
      <ToastContainer />
       </Suspense>
  
    </>

  );
}

export default App;
