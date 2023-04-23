import React, { createContext, useContext, useEffect, useState } from "react";
import useMiddlecat from "middlecat-react";
import { AmcatUser } from "../interfaces";
import styled from "styled-components";
import { SetState } from "../types";

// Use middlecat as a context provider. Wrap the app root in MiddlecatWrapper
// and use useMiddlecatContext to get the user and AuthForm. Set the
// route at which the AuthForm is used in MiddlecatContext to redirect
// to this route if a user is not logged in. The use will be redirected
// back automatically once logged in.

interface ContextProps {
  user: AmcatUser | undefined;
  loading: boolean;
  AuthForm: any;
  loginRoute: string | null;
  setAuthRequired: SetState<boolean>;
}

export const MiddlecatContext = createContext<ContextProps>({
  user: undefined,
  loading: false,
  AuthForm: null,
  loginRoute: null,
});

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);

  .modal {
    display: flex;
    background-color: #fffb;
    padding: 5rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 500px;
    height: 90%;
    max-height: 500px;
  }
`;

interface Props {
  children: React.ReactNode;
  fixedResource?: string;
  autoReconnect?: boolean;
  storeToken?: boolean;
  bff?: string | undefined;
}

export function MiddlecatWrapper({
  children,
  fixedResource,
  autoReconnect = true,
  storeToken = false,
  bff = undefined,
}: Props) {
  const [authRequired, setAuthRequired] = useState(false);
  const useMiddlecatProps = {
    fixedResource,
    autoReconnect,
    storeToken,
    bff,
  };

  const { user, loading, AuthForm } = useMiddlecat(useMiddlecatProps);

  return (
    <MiddlecatContext.Provider
      value={{ user, loading, AuthForm, setAuthRequired }}
    >
      {children}
      {authRequired && !loading && !user && (
        <LoginModal>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AuthForm primary="#3B2667" secondary="#673AB7" />
          </div>
        </LoginModal>
      )}
    </MiddlecatContext.Provider>
  );
}

export function useUser(args?: { authRequired?: boolean }) {
  const { user, loading, AuthForm, setAuthRequired } =
    useContext(MiddlecatContext);

  const authRequired = !!args?.authRequired;
  useEffect(() => {
    setAuthRequired(authRequired);
  }, [authRequired, setAuthRequired]);

  return { user, loading, AuthForm };
}
