import fs from 'fs';
import { faker } from '@faker-js/faker';
import User from '../types/User';

const readTwitterUsers = async () => {

    const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\twitter_combined.txt", 'utf8');
    const lines = fileContent.split("\n");
    const users: Set<string>= new Set<string>()
    lines.forEach(line => {
        const ids:any = line.split(" ");
        if(ids[0])
            users.add(ids[0].replace("\r", ""));
        if(ids[1])
            users.add(ids[1].replace("\r", ""));
    })
    return Array.from(users).map((user => {
        return { _key: user, name: faker.name.firstName() + " " + faker.name.lastName() } as User;
    }));
}

export default readTwitterUsers;