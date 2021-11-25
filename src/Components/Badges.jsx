import React, { Fragment } from "react";
const styles = {
  badge: { padding: "0 4px" },
};
const Badges = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <a
        style={styles.badge}
        href="https://www.npmjs.com/package/@dropzone-ui/react"
      >
        <img
          src="https://img.shields.io/npm/v/@dropzone-ui/react.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen"
          alt="npm latest package"
        />
      </a>

      <a
        style={styles.badge}
        href="https://openbase.com/js/@dropzone-ui/react?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge"
      >
        <img
          src="https://badges.openbase.com/js/rating/@dropzone-ui/react.svg"
          alt="Rate on Openbase"
        />
      </a>

      <a
        style={styles.badge}
        href="https://app.travis-ci.com/dropzone-ui/react"
      >
        <img
          src="https://app.travis-ci.com/dropzone-ui/react.svg?branch=master"
          alt="Build Status"
        />
      </a>

      <a
        style={styles.badge}
        href="https://lgtm.com/projects/g/dropzone-ui/dropzone-ui/context:javascript"
      >
        <img
          src="https://img.shields.io/lgtm/grade/javascript/g/dropzone-ui/dropzone-ui.svg?logo=lgtm&logoWidth=18"
          alt="Language grade: JavaScript"
        />
      </a>

      <a
        style={styles.badge}
        href="https://snyk.io/test/github/dropzone-ui/react"
      >
        <img
          src="https://snyk.io/test/github/dropzone-ui/react/badge.svg"
          alt="Known Vulnerabilities"
        />
      </a>

      <a
        style={styles.badge}
        href="https://packagequality.com/#?package=dropzone-ui"
      >
        <img
          src="https://packagequality.com/shield/dropzone-ui.svg"
          alt="Package Quality"
        />
      </a>

      <a
        style={styles.badge}
        href="https://packagephobia.com/result?p=@dropzone-ui/react"
      >
        <img
          src="https://packagephobia.com/badge?p=@dropzone-ui/react"
          alt="install size"
        />
      </a>

      <a style={styles.badge} href="http://makeapullrequest.com">
        <img
          src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
          alt="PRs Welcome"
        />
      </a>
    </div>
  );
};
export default Badges;
