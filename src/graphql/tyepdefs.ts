import fs from "node:fs";
const path = require("path");

const authFilePath = path.join(__dirname, "/typedefs/auth.graphql");
const payeesFilePath = path.join(__dirname, "/typedefs/payees.graphql");
const customerFilePath = path.join(__dirname, "/typedefs/customer.graphql");
// const schemaFilePath = new URL("schema.graphql", import.meta.url);

const typeDef = fs.readFileSync(authFilePath, "utf8");
const payeesDefs = fs.readFileSync(payeesFilePath, "utf8");
const customerDefs = fs.readFileSync(customerFilePath, "utf8");

export const typeDefs = [typeDef, payeesDefs, customerDefs]