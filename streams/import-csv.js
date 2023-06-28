import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParser = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromline: 2,
});

async function run() {
    const linesParse = stream.pipe(csvParser);

    for await (const line of linesParse) {
        const [title, description] = line;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })

        // Uncomment this line to see the import working in slow motion (open the db.json)
        // await wait(1000)
    }
}

run();

// function wait(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }