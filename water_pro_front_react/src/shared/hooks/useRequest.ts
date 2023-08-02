import { useState } from 'react';
import axios from 'axios';

export const useRequests = () => {
	const [loading, setLoading] = useState(false);

	const getRequest = async (url: string) => {
		setLoading(true);
		return await axios({
			method: "get",
			url: url,
		}).then((result) => {
			return result.data;
		}) .catch(() => { alert("Error"); });
	};

	const postRequest = async (url: string, body: any) => {
		setLoading(true);
		const returnData = await axios({
			method: "post",
			url: url,
			data: body,
		}).then((result) => {
			return result.data;
		}) .catch(() => { 
			alert("Error"); 
		});
			
		setLoading(false);
		return returnData;
	};

	
	const addRequest = async (url: string, body: any) => {
		setLoading(true);
		const returnData = await axios({
			method: "post",
			url: url,
			data: body,
		}).then((result) => {
			return result.data;
		}) .catch(() => { 
			alert("Error"); 
		});
			
		setLoading(false);
		return returnData;
	};

	return {
		loading,
		getRequest,
		postRequest,
		addRequest,
	};

}

