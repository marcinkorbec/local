import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from 'routes';
import { ACCESS_TOKEN } from 'utils/constants';

const PrivateRoute = ({ component, ...rest }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  return (
    <Route
      {...rest}
      render={() =>
        token ? (
          // <Component {...props} {...rest} />
          <>{component}</>
        ) : (
          <Redirect to={{ pathname: routes.login }} />
        )
      }
    />
  );
};

export default PrivateRoute;
