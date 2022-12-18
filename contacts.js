const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const searchedContact = parsedContacts.find(
      (contact) => contact.id === contactId
    );

    console.table(searchedContact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const updateContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    console.table(updateContacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: Date.now().toString(), name, email, phone };
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    parsedContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
    console.table(parsedContacts);
    console.log("Add contact");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
