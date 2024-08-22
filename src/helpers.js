export const makeRequest = async function (url, initPost) {
	try {
		const res = initPost ? await fetch(url, initPost) : await fetch(url);

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export const formatDate = function (date) {
	const options = { year: "numeric", month: "long", day: "numeric" };
	console.log(date);
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
		new Date(date)
	);
	return formattedDate;
};
