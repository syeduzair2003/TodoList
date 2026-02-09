import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import TestTodo from './component/testTodo'; 

function App() {

  return (
    <>

    <Navbar />
    
    <div className="container">
      <div id='cont1'>
        <h2>iTask - Your Task Manager</h2>
      </div>
      <TestTodo/>
    </div>

    
    </>
 
  );
}

export default App;
