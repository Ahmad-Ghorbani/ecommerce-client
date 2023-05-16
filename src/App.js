import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <DataProvider>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <MainPages />
          </div>
        </Router>
      </Provider>
    </DataProvider>
  );
}

export default App;
