export const dateFomat = dateString => {
	try {
		let date = dateString.replace(/ /g,"T")+'Z';
		date = new Date(new Date(Date.parse(date)).toString().split(' ').slice(0, 5).join() + ' GMT-0100').toLocaleString();
		date = date.split('/');
		return `${date[2]}-${date[0].length == 1 ? '0' + date[0] : date[0]}-${date[1].length == 1 ? '0' + date[1] : date[1]}`;
	} catch(err) {
		return '';
	}
}

export const dateTimeFomat = dateString => {
	try {
		let date = dateString.replace(/ /g,"T")+'Z';
		date = new Date(new Date(Date.parse(date)).toString().split(' ').slice(0, 5).join() + ' GMT-0100').toLocaleString();
		const time = date.split(' ')[1] + ' ' + date.split(' ')[2];
		date = date.split(' ')[0];
		date = date.split('/');
		return `${date[2].split(',')[0]}-${date[0].length == 1 ? '0' + date[0] : date[0]}-${date[1].length == 1 ? '0' + date[1] : date[1]} ${time}`;
	} catch(err) {
		return '';
	}
}