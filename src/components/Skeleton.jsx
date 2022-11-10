import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={355}
    viewBox="0 0 280 355"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="129" cy="105" r="77" />
    <rect x="36" y="206" rx="10" ry="10" width="192" height="18" />
    <rect x="35" y="232" rx="10" ry="10" width="192" height="43" />
    <rect x="37" y="312" rx="10" ry="10" width="57" height="25" />
    <rect x="137" y="307" rx="10" ry="10" width="90" height="36" />
  </ContentLoader>
);

export default Skeleton;
