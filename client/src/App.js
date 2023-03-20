import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privateRoutes } from "~/routes";
import { DefaultLayout } from "~/components/layout";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.component === null) {
            Layout = Fragment;
          }
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
