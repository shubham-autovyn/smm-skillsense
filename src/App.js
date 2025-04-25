import { ThemeProvider } from "@mui/material/styles";
import { createGenerateClassName, StylesProvider } from "@mui/styles";
import { createContext } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";  // Import Router
import "./App.css";
import store from "./services/store";
import Dashboard from "./Dashboard/Dashboard";
import { SMMTheme } from "./Theme/theme";

export const SMMContext = createContext({});

function App({ initialState = {} }) {
  const generateClassName = createGenerateClassName({
    seed: "dev",
    productionPrefix: "qpulse",
    disableGlobal: true,
  });
  
  return (
    <StylesProvider /* generateClassName={generateClassName} */>
      <SMMContext.Provider value={initialState}>
        <ThemeProvider theme={SMMTheme}>
          <Provider store={store}>
            <Router>  {/* Wrap everything in Router */}
              <div className="smm">
                <Dashboard />
              </div>
            </Router>
          </Provider>
        </ThemeProvider>
      </SMMContext.Provider>
    </StylesProvider>
  );
}

export default App;
