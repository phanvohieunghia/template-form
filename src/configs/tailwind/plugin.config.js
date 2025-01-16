import plugin from 'tailwindcss/plugin';

const className = "clip-path";
const cssRule = "clip-path";
const myTheme = "clipPath";
const myThemeFunction = "clipPathFunc";

const clipPath = {
  none: "none",
  margin: "margin-box",
  padding: "padding-box",
  content: "content-box",
  fill: "fill-box",
  stroke: "stroke-box",
  view: "view-box",
  inset: "inset(100px 50px)",
  circle: "circle(50px at 0 100px)",
  ellipse: "ellipse(50px 60px at 0 10% 20%)",
  polygon: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  arrow: "path('M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z');",
  inherit: "inherit",
  initial: "initial",
  revert: "revert",
  "revert-layer": "revert-layer",
  unset: "unset",
};

const clipPathFunc = {
  DEFAULT: "path",
  inset: "inset",
  circle: "circle",
  ellipse: "ellipse",
  polygon: "polygon",
  url: "url",
};

/** @type {import('tailwindcss').Config} */
export default plugin(function ({ matchUtilities, addUtilities, theme, e }) {

  matchUtilities(
    {
      'animate-duration': (value) => ({
        animationDuration: value,
      }),
    },
    { values: theme('transitionDuration') }
  );



  function setRuleWithParams(withParams, className, cssRule) {
    const ruleWithParams = Object.keys(withParams).reduce((result, key) => {
      if (key == "DEFAULT") {
        return {
          ...result,
          [`${className}`]: (valor) => ({
            [`${cssRule}`]: `${withParams[key]}(${valor})`,
          }),
        };
      }
      return {
        ...result,
        [`${className}-${e(key)}`]: (valor) => ({
          [`${cssRule}`]: `${withParams[key]}(${valor})`,
        }),
      };
    }, {});
    matchUtilities(ruleWithParams);
  }

  function setRule(values, className, cssRule) {
    const utilidad = Object.keys(values).reduce((result, key) => {
      if (key == "DEFAULT") {
        return {
          ...result,
          [`.${className}`]: {
            [`${cssRule}`]: values[key],
          },
        };
      }

      if (typeof values[key] === "object") {
        for (const subkey in values[key]) {
          result = {
            ...result,
            [`.${className}-${e(key)}-${e(subkey)}`]: {
              [`${cssRule}`]: values[key][subkey],
            },
          };
        }
        return result;
      }

      return {
        ...result,
        [`.${className}-${e(key)}`]: {
          [`${cssRule}`]: values[key],
        },
      };
    }, {});
    addUtilities(utilidad);
  }

  setRule({ ...theme(myTheme), ...clipPath }, className, cssRule);
  setRuleWithParams(
    { ...theme(myThemeFunction), ...clipPathFunc },
    className,
    cssRule
  );
});
