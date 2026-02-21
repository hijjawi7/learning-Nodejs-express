import express from 'express';
import {db} from "../postgresql/db.js"
import {cars,owners} from "../postgresql/schema.js";
import { eq } from 'drizzle-orm';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    next();
})

app.get('/',(req, res) => {
    res.json(cars);
});

router.get('/',async (req, res) => {

    const allCars = await db.select().from(cars)

    res.status(201).json(allCars);
});

router.post('/',async (req, res) => {

    const {make, model, year, price} = req.body;
    if(!make || !model || !year || !price){
        return res.status(400).json({error:"Missing fields"});
    }

    const [newCar] = await db.insert(cars).values({make, model, year, price}).returning()

    res.status(201).json(newCar);
});

router.put('/:id', async (req, res) => {


    const id = Number(req.params.id);
    const result =await db.select().from(cars).where(eq(cars.id, id)).execute();
    if (result.length === 0){
        return res.status(404).json({error: "Cars Not Found"})
    }else {
        const {make, model, year, price} = req.body;
        await db.update(cars)
            .set({
                make: make,
                model: model,
                price: price,
                year: year,
            })
             .where(eq(cars.id,id)).execute();
        return res.status(201).json({message: "updated"})
    }

});

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const index = await db.select().from(cars).where(eq(cars.id, id)).execute();
    if (index.length === 0){
        return res.status(404).json({error: "car not foun"});
    }

    await db.delete(cars).where(eq(cars.id,id)).execute();
    return res.status(201).json({message: "deleted"})

});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const car = await db.select().from(cars).where(eq(cars.id,id)).execute()

    if(car.length === 0) return res.status(404).send('Car not found');
    res.status(201).send('car found')

});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));