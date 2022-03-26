"use strict";
/**
babel.config.js with useful plugins. 
*/
module.exports = function (api) {
  api.cache(true);
  api.assertVersion("^7.4.5");

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
          node: true,
        },
      },
    ],
  ];
  const plugins = [ ];

  return {
    presets,
    plugins,
  };
};
