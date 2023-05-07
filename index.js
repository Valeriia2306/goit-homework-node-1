const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const result = await removeContact(id);
      console.log(result);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
