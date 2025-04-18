import { toast, Slide } from 'react-toastify';
import dayjs from "dayjs";
/**
 * accepts 19/04/2021, 08:18:54
 * returns 2021/04/19, 08:18:54
 */
export const dateParser = (dateTime) => {
	dateTime = dateTime.split(', ');
	dateTime = dateTime[0].split('/').reverse().join('/') + ', ' + dateTime[1];
	dateTime = convertUnixTime(+new Date(dateTime + ' UTC'));
	return dateTime;
};

export const jsonDataParser = (data) => {
	return <pre>{JSON.stringify(data, null, 10)}</pre>;
};

//accepts time in milliseconds
export function convertUnixTime(unixtime) {
	let u = new Date(unixtime);
	let year = u.getFullYear();
	let month = u.getMonth() + 1;
	let date = u.getDate();
	let hours = u.getHours();
	let minutes = u.getMinutes();
	let seconds = u.getSeconds();
	return (
		year +
		'-' +
		('0' + month).slice(-2) +
		'-' +
		('0' + date).slice(-2) +
		' ' +
		('0' + hours).slice(-2) +
		':' +
		('0' + minutes).slice(-2) +
		':' +
		('0' + seconds).slice(-2)
	);
}

export const notify = ({ msg = '', status = 400 }) => {
	if (status === 200) {
		toast(msg, {
			position: 'top-right',
			pauseOnFocusLoss: false,
			autoClose: 3000,
			transition: Slide,
			hideProgressBar: true,
		});
	} else {
		toast.info(msg, {
			position: 'top-right',
			pauseOnFocusLoss: false,
			autoClose: 3000,
			transition: Slide,
			hideProgressBar: true,
		});
	}
};

export const downloadCSV = (csvData, csvName) => {
	const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
	const a = document.createElement('a');
	var url = URL.createObjectURL(blob);
	a.setAttribute('href', url);
	a.setAttribute('download', `${csvName}.csv`);
	a.style.visibility = 'hidden';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};

export const getFormattedEpocDateTime = (inputDate) => {
	if (Number.isInteger(inputDate)) {
	  return dayjs(inputDate * 1000).format("DD/MM/YYYY, HH:mm:ss");
	}
	return "-";
  };