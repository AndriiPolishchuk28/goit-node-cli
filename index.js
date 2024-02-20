import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
} from "./contacts.js";
const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
