import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const birthday = faker.date.anytime();
    const salary = faker.number.int({ min: 0, max: 1000000 });
    const employee = await createEmployee(name, birthday, salary);
  }
}
