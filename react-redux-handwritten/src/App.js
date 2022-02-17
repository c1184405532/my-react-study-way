// import logo from './logo.svg';
import './App.css';
import { Provider } from "./react-redux";
import store from './store';
import Index from "./pages/index";
// 传递store数据
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Index/>
      </div>
    </Provider>
  );
}

export default App;
