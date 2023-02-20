const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

// --------------- List Contacts ---------------
const listContacts = async () => {
  const contacts = await readFile(contactsPath);
  return contacts;
};

// --------------- Get Contact By Id ---------------
const getContactById = async (contactId) => {
  const contacts = await readFile(contactsPath);
  const foundContact = contacts.find((contact) => contact.id === contactId.toString());
  return foundContact;
};

// --------------- Add Contact ---------------
const addContact = async (body) => {
  const contacts = await readFile(contactsPath);
  const id = randomUUID();
  const newContact = { id, ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

// --------------- Remove Contact ---------------
const removeContact = async (contactId) => {
  const contacts = await readFile(contactsPath);
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index < 0) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

// --------------- Update Contact ---------------
const updateContact = async (contactId, body) => {
  const contacts = await readFile(contactsPath);
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index < 0) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

// --------------- Read File ---------------
async function readFile(path) {
  const data = await fs.readFile(path, "utf8");
  return JSON.parse(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
