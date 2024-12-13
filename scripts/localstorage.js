function saveToFavorites(city)
{
    let cityArr = getFromFavorites();
    if (!cityArr.includes(city))
    {
        cityArr.push(city);
    }

    localStorage.setItem('Cities', JSON.stringify(cityArr))
    console.log(localStorage);
}

function getFromFavorites()
{
    let favoritesData = localStorage.getItem('Cities');

    if (favoritesData == null)
    {
        return [];
    }

    return JSON.parse(favoritesData);
}



export { getFromFavorites , saveToFavorites}