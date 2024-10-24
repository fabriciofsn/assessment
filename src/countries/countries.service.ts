import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {

  async findAll() {
    const countries = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    return countries.data;
  }

  async findOne(id: string) {

    try {
      const country = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${id}`);
      const populationData = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
      const flag = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');

      const countryName = country.data.commonName;

      const population = populationData.data.data.filter(item => {
        if (item.country == countryName) return item.populationCounts;
      })

      const countryFlag = flag.data.data.filter((item) => {
        if (item.name == countryName) return item.flag;
      })

      return {
        countryName: countryName,
        borders: country.data.borders,
        population: population[0].populationCounts,
        flag: countryFlag[0].flag
      };
    } catch (error) {
      console.log(error)
    }
  }
}
