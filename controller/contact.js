const contactModel = require("../model/contact");
const transport = require("../utils/mail");
require("dotenv").config();

const viewContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();

    res.status(200).json({
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const viewOneContact = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.contactId);

    if (contact) {
      res.status(200).json({
        data: contact,
        message: "Contact message found",
      });
    } else {
      res.status(404).json({
        message: "Contact message not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactMessage = await contactModel.findById(req.params.contactId);

    if (contactMessage) {
      await contactModel.findByIdAndDelete(req.params.contactId);

      res.status(204).json({
        message: "Contact message deleted",
      });
    } else {
      res.status(404).json({
        message: "Contact message not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactMessage = await contactModel.findById(req.params.contactId);

    if (contactMessage) {
      const newContactMessage = await contactModel.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
      );

      res.status(200).json({
        data: newContactMessage,
        message: "Contact message deleted",
      });
    } else {
      res.status(404).json({
        message: "Contact message not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const contactAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, tel, message } = req.body;

    const contact = await contactModel.create(req.body);

    const mailOptions = {
      from: process.env.USER,
      to: "scofid1st@gmail.com",
      subject: "Request for Quote",
      html: `
        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Customer Email:</b> ${email}</p>
        <p><b>Customer Phone:</b> ${tel}</p>
        <p><b>Message:</b> ${message}</p>
        <br/>
        <h3>Please reply: ${email}</h3>
        `,
    };

    await transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          data: contact,
          message: `Email Sent ${info.response}`,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  contactAdmin,
  viewContacts,
  viewOneContact,
  updateContact,
  deleteContact,
};
