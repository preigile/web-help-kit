import React, { Component, ComponentType } from "react";
import Skeleton from "../components/Skeleton";
import style from "../components/TableOfContents/TableOfContents.module.scss";

interface WithLoadingProps {
  isLoading: boolean;
}

export const withLoading =
  <P, S>(WrappedComponent: ComponentType<P>) =>
  (props: P & WithLoadingProps) =>
    props.isLoading ? (
      <div className={style.skeletonContainer}>
        <Skeleton />
        <Skeleton />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
