import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./routes";
import Home from "../pages/Home";
import Q1 from "../pages/Q1";
import Q2 from "../pages/Q2";
import Q3 from "../pages/Q3";
import Q4 from "../pages/Q4";
import Q5 from "../pages/Q5";
import Q6 from "../pages/Q6";
import Wrapper from "../pages/Wrapper";
const RouterSwitch = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Home />} />
        <Route path="/" element={<Wrapper />}>
          <Route path={ROUTES.POSTSACCOUNT1} element={<Q1 />} />
          <Route path={ROUTES.TOPFOLLOWER2} element={<Q2 />} />
          <Route path={ROUTES.TOPFOLLOWEROFUSER3} element={<Q3 />} />
          <Route path={ROUTES.USERINFO} element={<Q4 />} />
          <Route path={ROUTES.FANOUT5} element={<Q5 />} />
          <Route path={ROUTES.TOP25TWEETS6} element={<Q6 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterSwitch;
