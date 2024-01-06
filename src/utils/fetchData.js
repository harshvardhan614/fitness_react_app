export const exerciseOptions  = {
    method: 'GET',
    // url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': "64db367facmshd5be2a3ea6ec303p11c8d3jsn92c807867e76",
    }
  };
  
export const fetchData = async (url, options) =>{
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}