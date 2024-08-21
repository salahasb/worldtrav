export const makeRequest = async function (url, initPost) {
	try {
		const res = initPost ? await fetch(url, initPost) : await fetch(url);

		const data = await res.json();

		console.log("succeed");
		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};
