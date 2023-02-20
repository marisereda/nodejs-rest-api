const api = require("../models/contacts");
const { BadRequest, NotFound } = require("http-errors");

// --------------- Get Contacts ---------------
async function getContacts(req, res) {
  const contacts = await api.listContacts();
  res.status(200).json({ contacts });
}

// --------------- Get Contact By Id ---------------
async function getContactById(req, res) {
  const foundContact = await api.getContactById(req.params.id);
  if (!foundContact) {
    throw NotFound();
  }
  res.status(200).json({ foundContact });
}

// --------------- Add Contact ---------------
async function addContact(req, res) {
  const addedContact = await api.addContact(req.body);
  res.status(201).json({ addedContact });
}

// --------------- Delete Contact ---------------
async function deleteContact(req, res) {
  const deletedContact = await api.removeContact(req.params.id);
  if (!deletedContact) {
    throw NotFound();
  }
  res.status(200).json({ status: "success", code: 200, message: "contact was deleted", data: deletedContact });
}

// --------------- Update Contact ---------------
async function updateContact(req, res) {
  if (Object.keys(req.body).length === 0) {
    throw BadRequest("Missing fields");
  }
  const updatedContact = await api.updateContact(req.params.id, req.body);
  if (!updatedContact) {
    throw NotFound();
  }
  res.status(200).json({ updatedContact });
}

module.exports = { getContacts, getContactById, addContact, deleteContact, updateContact };
