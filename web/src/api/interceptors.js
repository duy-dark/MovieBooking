import { useDispatch, useSelector } from "react-redux";
import { clearToken } from '../redux/modules/actions/users';
import { showSpinner, hideSpinner } from '../redux/modules/actions/layout';
import camelcaseKeys from "camelcase-keys";

const setup = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      const token = useSelector(state => state.users.token) || localStorage.getItem('token');
      if (token) {
        config.headers.Authenticator = `Bearer ${token}`;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
};

const checkToken = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      if (response.headers["content-type"].startsWith("application/json")) {
        response.data = camelcaseKeys(response.data, { deep: true });
      }
      return response;
    },
    (error) => {
      if (
        (!!sessionStorage.getItem("token") ||
          !!localStorage.getItem("token")) &&
        !window.location.pathname.includes("login")
      ) {
        // clear token storage
        useDispatch(clearToken())
      }
      return Promise.reject(error);
    }
  );
};

const checkError = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      setTimeout(() => {
        useDispatch(hideSpinner())
      }, 500)
      return response;
    },
    (error) => {
      setTimeout(() => {
        useDispatch(hideSpinner())
      }, 500)
      return Promise.reject(error);
    }
  );
};

const showSpinnerRequest = (instance) => {
  instance.interceptors.request.use(
    request => {
      // set value showSpinner in store
      useDispatch(showSpinner())
      return request
    },
    error => {
      // set value showSpinner in store
      useDispatch(showSpinner())
      return Promise.reject(error)
    }
  )
}

const hideSpinnerRequest = (instance) => {
  instance.interceptors.response.use(
    response => {
      setTimeout(() => {
        // set value showSpinner in store
        useDispatch(hideSpinner())
      }, 500)
      return response
    },
    error => {
      setTimeout(() => {
        // set value showSpinner in store
        useDispatch(hideSpinner())
      }, 500)
      return Promise.reject(error)
    }
  )
}

export default {
  setup,
  checkToken,
  checkError,
  showSpinnerRequest,
  hideSpinnerRequest
};
