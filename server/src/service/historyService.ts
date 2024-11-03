import fs from 'fs';
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  constructor(name, id){
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
    } else {
      resolve(JSON.parse(data || '[]'));
    }
   });
  });
}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}

  private async write(cities) {
    return new Promise ((resolve, reject) => {
      fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}

  async getCities(){
  const citiesData = await this.read();
  return citiesData.map(city => new City(city.name, city.id));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}

  async addCity(name){
    const cities = await this.getCities();
    const id = (cities.lenght > 0) ? Math.max(...cities.map(city => city.id)) +1 : 1;
    const newCity = new City(name, id);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id){
    let cities = await this.getCitites();
    cities = cities.filter(city => city.id !== parseInt(id));
    await this.write(cities);
  }
}

export default new HistoryService();
