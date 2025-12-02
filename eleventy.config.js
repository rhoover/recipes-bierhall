// Plugins
import eleventySass from "eleventy-sass";
import pluginRev from "eleventy-plugin-rev";
import { minify } from "terser";

// Utilities
import { sassOptions } from "./src/_eleventy/utilities/sassCompileOptions.js";

export default async function(eleventyConfig) {

  ////////////////////////////////////////////////////
  // Watch Javascript File Changes, and Minimize
  ////////////////////////////////////////////////////

  // folder to keep an eye on
  eleventyConfig.addWatchTarget("./src/js/inline/");
  // let'er rip
  eleventyConfig.addFilter("jsmin", async function (code) {
    let minified = await minify(code);
    return minified.code;
	});


  ////////////////////////////////////////////////////
  // Pass Throughs
  ////////////////////////////////////////////////////

  ['src/img', {'src/js/packages': 'js/packages/'}, {"src/fonts": "fonts"}].forEach(filesFromPath =>
    eleventyConfig.addPassthroughCopy(filesFromPath)
  );
  eleventyConfig.addPassthroughCopy('favicon.ico');

  ////////////////////////////////////////////////////
  // Plugins
  ////////////////////////////////////////////////////

  // let eleventy handle compiling sass
  eleventyConfig.addPlugin(eleventySass, sassOptions);
  // revision the css filename
  eleventyConfig.addPlugin(pluginRev);};


// Build Config
export const config = {
  dir: {
    input: "src",
    output: "prod"
  },
  htmlTemplateEngine: "njk",
  templateFormats: ["html", "njk"]
};