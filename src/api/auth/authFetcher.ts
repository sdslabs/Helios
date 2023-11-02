import axiosInstance from "@api/axiosInstance";

export const checkAuth= async () => {
	try {
		const res = await axiosInstance.get('auth/user',{
			withCredentials:true
		});
		return res.data;
	} catch (e:any) {//!--
		return e.response.data;
	}
};

