function CountryDetails({ country }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-64 h-40 object-cover rounded border"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{country.name}</h2>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
          <p><strong>Coordinates:</strong> {country.latlng?.join(", ")}</p>
          <p><strong>Timezones:</strong> {country.timezones?.join(", ")}</p>
          <p><strong>Languages:</strong> {country.languages?.map(lang => lang.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
