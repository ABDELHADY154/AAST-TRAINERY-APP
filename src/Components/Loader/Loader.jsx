import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

// const ProfileImgLoader = () => <ContentLoader />;
export const ProfileImgLoader = (props) => (
  <ContentLoader
    speed={2}
    width={120}
    height={120}
    viewBox="0 0 120 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#dcdbdb"
    {...props}
  >
    <Circle cx="56" cy="56" r="56" />
  </ContentLoader>
);

export const DrawerProfile = (props) => (
  <ContentLoader
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#dcdbdb"
    {...props}
  >
    <Rect x="5" y="63" rx="3" ry="3" width="115" height="8" />
    <Rect x="5" y="86" rx="3" ry="3" width="68" height="8" />
    <Circle cx="26" cy="26" r="26" />
  </ContentLoader>
);
