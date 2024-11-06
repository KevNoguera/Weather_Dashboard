import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const {cityName} = req.body;

  try {
    // TODO: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // TODO: save city to search history
    await HistoryService.addCity(cityName);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get search history'});
  }
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request<{ id: string}>, res: Response) => {;
const {id} = req.params;

try{
  const result:any = HistoryService.removeCity(id);
  
  if (!result) {
    return res.status(404).json({error: 'City history is not found'});
  }

  return result.status(204).send();
} catch (error) {
  console.error(error);
  return res.status(500).json({error: 'Failed to delete city history'});
}
});

export default router;
