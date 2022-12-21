const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const path = require("path");
const fs = require("fs");

const contactsPath = path.resolve("./db/contacts.json");

const PORT = 8081;

const { Command } = require("commander");
const http = require("http");

const requestHandler = async (request, response) => {
  const contacts = await fs.readFileSync(contactsPath, "utf-8");
  response.writeHead(200, { ContentType: "text/json" });
  response.end(contacts);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error at a server launch", err);
  }
  console.log(`Server works at a port ${PORT}`);
});

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
