import axiosInstance from "@auth/api/axiosInstance";

export const checkAuth= async () => {
	try {
		const res = await axiosInstance.get('auth/user',{
			withCredentials:true
		});
		return res.data;
	} catch (e:any) {
		return e.response.data;
	}
};

export const onboard = async({personalDetails,educationalDetails,socialMediaHandles,user}:any)=>{//!
	try{
		console.log('sent')
		const res = await axiosInstance.post('auth/onboard',
		{
			personalDetails,
			educationalDetails,
			socialMediaHandles,
			user,
		  },
		  {
			withCredentials: true,
		  }
		);
		return res.data;
	}catch(e:any){
		return e.response.data;
	}
}

