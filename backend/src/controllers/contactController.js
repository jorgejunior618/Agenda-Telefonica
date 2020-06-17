const configDb = require('../config/database');


exports.read = async (req, res) => {
  const { rows } = await configDb
  .query("Select * from Contacts");
  return res.json(rows);
}

exports.create = async (req, res) => {
  const { name, surname, phone, email } = req.body;

  const response = await configDb
  .query(
    "INSERT INTO Contacts (name, surname, phone, email) VALUES($1, $2, $3, $4)",
    [name, surname, phone, email]
    );
  return res.json({
    success: "Contact successfully created.",
    contact: { name, surname, phone, email }
  });
}

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, surname, phone, email } = req.body;

  const { rows } = await configDb
  .query(
    "Select * from Contacts where id = $1",
    [id]
  );
  const contact = rows[0];

  const response = await configDb
  .query(
    `Update Contacts set name = $1, surname = $2, phone = $3, email = $4 where id = $5`,
    [
      name || contact.name,
      surname || contact.surname,
      phone || contact.phone,
      email || contact.email,
      id
    ]
  );

  return res.json({ success: "Contact successfully updated." });
}

exports.delete = async (req,res) => {
  const { id } = req.query;

  const response = await configDb
  .query(
    "Delete from Contacts where id = $1",
    [id]
  );
  
  return res.json({ success: "Contact successfuly deleted" });
}
