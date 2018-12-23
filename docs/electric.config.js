"use strict";

var marble = require("marble");

module.exports = {
  metalComponents: ["electric-marble-components", "marble-topbar"],
  sassOptions: {
    includePaths: ["node_modules", marble.src]
  },
  vendorSrc: ["node_modules/marble/build/fonts/**"],
  basePath: "/osagai",
  envOptions: {
    dev: {
      basePath: ""
    }
  },
  deployOptions: {
    branch: "gh-pages"
  },
  codeMirrorLanguages: ["shell", "javascript", "xml", "css"]
};
