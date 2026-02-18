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
    res.json(cars);
});

router.post('/',(req, res) => {
    const {make, model, year ,price} = req.body;

    if(!make || !model || !year || !price){
        return res.status(400).json({error: "Missing fields"});
    }

    const newCars = {
        id: cars.length+1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };

    cars.push(newCars);
    res.status(201).json(newCars)
});

router.put('/:id', (req, res) => {

    const id = Number(req.params.id);
    const index = cars.findIndex(car => car.id === id);

    if(index === -1){
        return res.status(404).json({error: "Car Not Found"});
    }

    const {make, model, year ,price} = req.body;

    if (make) cars[index].make = make;
    if (model) cars[index].model = model;
    if (year) cars[index].year = Number(year);
    if (price) cars[index].price = Number(price);

    res.json(cars[index]);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex(car => car.id === id);

    if (index === -1){
        return res.status(404).json({error: "Car Not Found"});
    }

    const deleted = cars.splice(index, 1)[0];

    res.json({message: "Car Deleted", car: deleted});

});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id)

    if(!car) return res.status(404).send('Car not found');

    res.json(car);

});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));