import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "https://bierhallrecipes.com/data-recipes/recipes.json";

	let json = await Fetch(url, {
		duration: "0s", // always make a new request
		type: "json", // we’ll parse JSON for you
	});

	return json;
};