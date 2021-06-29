import React, { ComponentType } from "react";

interface WithErrorProps {
  isError: boolean;
}

export const withError =
  <P, S>(WrappedComponent: ComponentType<P>) =>
  (props: P & WithErrorProps) => {
    return props.isError ? <div>Упс</div> : <WrappedComponent {...props} />;
  };
