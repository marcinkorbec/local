import React from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

// import { centerFlex } from 'styles/mixins';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from 'common/PrivateRoute';
import routes from 'routes';

import Login from 'pages/Login/Login';
import HomePage from 'pages/HomePage/HomePage';
import Header from 'pages/Header/Header';
import Users from 'pages/Administration/Users/Users';
import Inspection from 'pages/Inspection/Inspection';
import ReportCreator from 'pages/ReportCreator/ReportCreator';
import ItemCreator from 'pages/ItemCreator/ItemCreator';
import { centerFlex } from 'styles/mixins';
import Accession from 'pages/Books/Accession/Accession';
import Inventory from 'pages/Books/Inventory/Inventory';
import Books from 'pages/Administration/Books/Books';
import Shortages from 'pages/Books/Shortages/Shortages';
import InspectionDetails from 'pages/Inspection/InspectionDetails/InspectionDetails';
import Depository from 'pages/Books/Depository/Depository';
import MuseumObjects from 'pages/Registers/MuseumObjects/MuseumObjects';
import Evidence from 'pages/Registers/Evidence/Evidence';
import SupportingEvidence from 'pages/Registers/SupportingEvidence/SupportingEvidence';
import ClassificationTypes from 'pages/ClassificationTypes/ClassificationTypes';
import GeneralData from 'pages/Administration/GeneralData/GeneralData';
import Committee from 'pages/Committee/Committee';
import Documents from './pages/Documents/Documents';

// example styles in styled component
const Wrapper = styled.div`
  position: relative;
  background-color: ${theme.background};
  height: 100vh;
  width: 100%;
  ${centerFlex};
  padding: 0;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper className='App'>
        <Router>
          <Header />
          <Switch>
            <Route exact path={routes.login} component={Login} />
            <PrivateRoute
              component={
                <>
                  <Route exact path={routes.home} component={HomePage} />
                  <Route exact path={routes.report} component={ReportCreator} />
                  <Route
                    exact
                    path={routes.book.accession}
                    component={Accession}
                  />
                  <Route
                    exact
                    path={routes.book.inventory}
                    component={Inventory}
                  />
                  <Route
                    exact
                    path={routes.book.deposit}
                    component={Depository}
                  />
                  <Route
                    exact
                    path={routes.book.shortage}
                    component={Shortages}
                  />
                  <Route
                    exact
                    path={routes.register.museumObjects}
                    component={MuseumObjects}
                  />
                  <Route
                    exact
                    path={routes.register.evidence}
                    component={Evidence}
                  />
                  <Route
                    exact
                    path={routes.register.supportingEvidence}
                    component={SupportingEvidence}
                  />
                  <Route exact path={routes.admin.users} component={Users} />
                  <Route exact path={routes.admin.books} component={Books} />
                  <Route
                    exact
                    path={routes.admin.generalData}
                    component={GeneralData}
                  />
                  <Route
                    exact
                    path={routes.inspection}
                    component={Inspection}
                  />
                  <Route
                    exact
                    path={routes.inspectionDetails}
                    component={InspectionDetails}
                  />
                  <Route
                    exact
                    path={routes.itemCreator}
                    component={ItemCreator}
                  />
                  <Route exact path={routes.documents} component={Documents} />
                  <Route
                    exact
                    path={routes.typesOfSets}
                    component={ClassificationTypes}
                  />
                  <Route exact path={routes.committee} component={Committee} />
                </>
              }
            />
          </Switch>
        </Router>
      </Wrapper>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
