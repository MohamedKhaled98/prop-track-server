import Viewing, { ViewingAttributes } from "../models/viewing";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import PropertyService from "./property.service";
import { BadRequest, NotFoundError } from "../utils/AppError";
import { ContactService } from "./contact.service";

dayjs.extend(utc);

class ViewingService {
  protected propertyService: PropertyService;
  protected contactService: ContactService;

  constructor() {
    this.propertyService = new PropertyService();
    this.contactService = new ContactService();
  }

  async scheduleViewing(agentId: string, data: ViewingAttributes) {
    const { contactId, propertyId, datetime, notes } = data;

    const property = await this.propertyService.findById(propertyId);
    if (!property) throw new BadRequest("Property not found");

    const contact = await this.contactService.findById(contactId);
    if (!contact) throw new BadRequest("Contact not found");

    const now = dayjs().utc();
    const utcDatetime = dayjs(datetime).utc();

    if (!utcDatetime.isAfter(now)) {
      throw new BadRequest("datetime must be in the future");
    }

    const viewing = await Viewing.create({
      agentId,
      contactId,
      propertyId,
      datetime: utcDatetime.toISOString(),
      notes,
    });

    return viewing;
  }

  async update(id: string, data: ViewingAttributes) {
    const { status, notes } = data;

    const viewing = await Viewing.findById(id);
    if (!viewing) throw new NotFoundError("Viewing not found");

    viewing.status = status;
    viewing.notes = notes;

    await viewing.save();

    return viewing;
  }
}

export default ViewingService;
