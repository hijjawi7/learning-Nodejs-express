import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

let cars = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2022,price: 28000},
    {id: 2, make: 'Tesla', model: 'Model s', year: 2023,price: 25000},
    {id: 3, make: 'Ford', model: 'F-150', year: 2021,price: 35000},
]

app.get('/',(req, res) => {
    res.json(cars);
});

router.get('/',(req, res) => {
    res.send('All cars');
});

router.post('/',(req, res) => {
    res.send('New car');
});

router.put('/:id', (req, res) => {
    res.send('Update car');
});

router.delete('/:id', (req, res) => {
    res.send('Delete car');
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id)

    if(!car) return res.status(404).send('Car not found');

    res.json(car);

});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));