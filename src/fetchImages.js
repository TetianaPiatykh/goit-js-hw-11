   
    

export default function fetchCountries(name) {

    const mainhUrl = 'https://restcountries.com/v3.1/name/';
    const parametersUrl = '?fields=name,capital,population,flags,languages';

    return fetch(`${mainhUrl}${name}${parametersUrl}`).then(response => {
        return response.json();
    })
}
