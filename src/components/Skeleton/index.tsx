import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <ContentLoader width={"100%"} height={120} speed={3}>
      <rect x="0" y="0" rx="5" ry="5" width="90%" height="15" />
      <rect x="10%" y="30" rx="5" ry="5" width="90%" height="15" />
      <rect x="10%" y="60" rx="5" ry="5" width="80%" height="15" />
      <rect x="10%" y="90" rx="5" ry="5" width="90%" height="15" />
    </ContentLoader>
  );
};

export default Skeleton;
