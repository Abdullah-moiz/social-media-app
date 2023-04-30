import Cookies from "js-cookie";

export const getListOfAllUser = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/friend`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting list of all users  (service) => ', error);
    }
}
