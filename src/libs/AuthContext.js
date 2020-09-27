import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from 'react';
import { isTokenValid, getEmail } from './api';

const TOKEN_KEY = "token";

const Context = createContext();

const Provider = ({children}) => {
    const [state, setState] = useState({loading: true, isAuthorised: false, token: null, error: null, email: null});

    const actions = {
        tryResumeSession: useCallback(() => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!!token && isTokenValid(token)) {
                setState({loading: false, isAuthorised: true, token: token, error: null, email: getEmail(token)});
            } else {
                localStorage.removeItem(TOKEN_KEY);
                setState({loading: false, isAuthorised: false, token: null, error: 'Session expired', email: null});
            }
        }, []),
        login: useCallback((token) => {
            if (isTokenValid(token)) {
                localStorage.setItem(TOKEN_KEY, token);
                setState({loading: false, isAuthorised: true, token: token, error: null, email: getEmail(token)});
            } else {
                localStorage.removeItem(TOKEN_KEY);
                setState({loading: false, isAuthorised: false, token: null, error: 'Session token invalid', email: null});
            }
        }, []),
        logout: useCallback(() => {
            localStorage.removeItem(TOKEN_KEY);
            setState({loading: false, isAuthorised: false, token: null, error: null, email: null});
        }, []),
        clearError: useCallback(() => {
            setState({...state, error: null});
        }, []),
    };

    const checkSessionOnStart = useCallback(() => actions.tryResumeSession(), []);
    useEffect(() => {
        checkSessionOnStart();
    }, [checkSessionOnStart])

    return (
        <Context.Provider value={{...actions, ...state}}>
            {children}
        </Context.Provider>
    )
};

export {Context as AuthContext, Provider as AuthProvider};
