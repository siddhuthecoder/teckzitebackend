import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  const { name, dep, img, desc, structure, rules, teamSize, contact_info } =
    req.body;
  try {
    const event = await Event.create({
      name,
      dep,
      img,
      desc,
      structure,
      rules,
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
    const { name, dep, img, desc, structure, rules, teamSize, contact_info } =
      req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, dep, img, desc, structure, rules, teamSize, contact_info },
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
  const userId = req.user;
  const eventId = req.params.userId;
  const { tzkIds } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $push: { registerdStudents: tzkIds } },
      { new: true }
    );

    for (const id of tzkIds) {
      await User.findByIdAndUpdate(id, { $push: { regEvents: eventId } });
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
