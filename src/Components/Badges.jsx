import React, { Fragment } from "react";

const Badges = (props) => {
  return (
    <Fragment>
      <a href="https://github.com/dropzone-ui/react/blob/HEAD/LICENSE">
        <img
          src="https://img.shields.io/badge/license-MIT-blue.svg"
          alt="license"
        />
      </a>

      <a href="https://www.npmjs.com/package/@dropzone-ui/react">
        <img
          src="https://img.shields.io/npm/v/@dropzone-ui/react.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen"
          alt="npm latest package"
        />
      </a>

      <a href="https://openbase.com/js/@dropzone-ui/react?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge">
        <img
          src="https://badges.openbase.com/js/rating/@dropzone-ui/react.svg"
          alt="Rate on Openbase"
        />
      </a>

      <a href="https://app.travis-ci.com/dropzone-ui/react">
        <img
          src="https://app.travis-ci.com/dropzone-ui/react.svg?branch=master"
          alt="Build Status"
        />
      </a>

      <a href="https://lgtm.com/projects/g/dropzone-ui/dropzone-ui/context:javascript">
        <img
          src="https://img.shields.io/lgtm/grade/javascript/g/dropzone-ui/dropzone-ui.svg?logo=lgtm&logoWidth=18"
          alt="Language grade: JavaScript"
        />
      </a>

      <a href="https://lgtm.com/projects/g/dropzone-ui/dropzone-ui/alerts/">
        <img
          src="https://img.shields.io/lgtm/alerts/g/dropzone-ui/dropzone-ui.svg?logo=lgtm&logoWidth=18"
          alt="Total alerts"
        />
      </a>

      <a href="https://snyk.io/test/github/dropzone-ui/react">
        <img
          src="https://snyk.io/test/github/dropzone-ui/react/badge.svg"
          alt="Known Vulnerabilities"
        />
      </a>

      <a href="https://packagequality.com/#?package=dropzone-ui">
        <img
          src="https://packagequality.com/shield/dropzone-ui.svg"
          alt="Package Quality"
        />
      </a>

      <a href="https://packagephobia.com/result?p=@dropzone-ui/react">
        <img
          src="https://packagephobia.com/badge?p=@dropzone-ui/react"
          alt="install size"
        />
      </a>

      <a href="http://isitmaintained.com/project/dropzone-ui/react">
        <img
          src="http://isitmaintained.com/badge/resolution/dropzone-ui/react.svg"
          alt="Average time to resolve an issue"
        />
      </a>

      <a href="http://makeapullrequest.com">
        <img
          src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
          alt="PRs Welcome"
        />
      </a>

      <a href="https://github.com/dropzone-ui/react">
        <img
          src="https://img.shields.io/github/stars/dropzone-ui/react?label=Star%20me%20please%20:D&style=social"
          alt="GitHub Repo stars"
        />
      </a>
    </Fragment>
  );
};
export default Badges;
