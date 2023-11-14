export const formatPrice = (price) => {
	// Menggunakan fungsi Intl.NumberFormat dengan konfigurasi untuk format rupiah
	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	});

	return formatter.format(price);
};

// custom change to title case
export const toTitleCase = (str) => {
	if (!str) return '';
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

// Mengubah format waktu menjadi format yang biasa (contoh: "6 Maret 2023, 14:37:04")
export const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);

	function getMonthName(monthIndex) {
		const months = [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		];

		return months[monthIndex];
	}

	function padNumber(number) {
		return number.toString().padStart(2, '0');
	}

	const formattedDate = `${date.getDate()} ${getMonthName(
		date.getMonth()
	)} ${date.getFullYear()}, ${padNumber(date.getHours())}:${padNumber(
		date.getMinutes()
	)}:${padNumber(date.getSeconds())}`;

	return formattedDate;
};

export const parseHTMLString = (htmlString) => {
	const parser = new DOMParser();
	const parsedDocument = parser.parseFromString(htmlString, 'text/html');

	return parsedDocument;
};