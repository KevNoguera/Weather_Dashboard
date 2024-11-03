import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const {city} = req.body;

  if (!city) {
    return res.status(400).json({message: 'City name is required'});
    }

  // TODO: GET weather data from city name
  try {
    const weatherData = await WeatherService.getWeatherByCity(city);


// TODO: save city to search history
await HistoryService.saveSearchHistory(city);
  
return res.status(200).json(weatherData);
} catch (error) {
  console.error(error);
  return res.status(500).json({message: 'City not found'});
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getSearchHistory();
    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Failed to get serach history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {;
const {id} = req.params;

try{
  const result = await HistoryService.deleteSearchHistory(id);

  if (result.deletedCount === 0){
    return result.status(404).json({error: 'City history is not found'});
  }

  return result.status(204).send();
} catch (error) {
  console.error(error);
  return res.status(500).json({error: 'Failed to delete city history'});
}
});

export default router;
