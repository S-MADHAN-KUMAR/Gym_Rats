import axios from 'axios';

const fetchCurrUser = async (userId) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/get_current_user/${userId}`);

    if (res.status === 200) {
      const fetchedUser = res.data.currentUser;
      if (fetchedUser.status === false) {
        console.log('User blocked...');
        return null;
      }
      return fetchedUser;
    }
  } catch (error) {
    console.error('Error in fetchCurrUser:', error.message);
    return null; 
  }
}


export {
    fetchCurrUser,
}
