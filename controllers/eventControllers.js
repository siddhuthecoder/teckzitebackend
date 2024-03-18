import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

export const createEvent = async (req, res) => {
  const {
    name,
    dep,
    img,
    desc,
    structure,
    rules,
    prizeMoney,
    teamSize,
    contact_info,
  } = req.body;
  try {
    const event = await Event.create({
      name,
      dep,
      img,
      desc,
      structure,
      rules,
      prizeMoney,
      teamSize,
      contact_info,
    });
    return res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Internal Server Error" });
  }
};

export const fetchAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find();

    if (!allEvents || allEvents.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const fetchEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      dep,
      img,
      desc,
      prizeMoney,
      structure,
      rules,
      teamSize,
      contact_info,
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        name,
        dep,
        img,
        desc,
        structure,
        prizeMoney,
        rules,
        teamSize,
        contact_info,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const eventRegistration = async (req, res) => {
  const eventId = req.params.id;
  const { tzkIds } = req.body;

  try {
    const existingUsers = await User.find({ tzkid: { $in: tzkIds } });
    if (existingUsers.length !== tzkIds.length) {
      return res.status(404).json({ message: `Invalid Teckzite Ids` });
    }

    const userIds = existingUsers.map((user) => user._id);

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { registerdStudents: userIds } },
      { new: true }
    );

    if (updatedEvent.teamSize !== userIds.length) {
      await User.updateMany(
        { _id: { $in: userIds } },
        { $pull: { regEvents: eventId } }
      );

      await Event.findByIdAndUpdate(
        eventId,
        { $pull: { registerdStudents: userIds } },
        { new: true }
      );
      return res.status(400).json({ message: "Team size doesn't match" });
    }

    return res.status(200).json({ event: updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
