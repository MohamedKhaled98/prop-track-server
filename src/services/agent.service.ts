import { Agent, AgentAttributes } from "../models/agent";
import Viewing, { ViewingAttributes } from "../models/viewing";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import PropertyService from "./property.service";
import { BadRequest } from "../utils/AppError";
import Contact from "../models/contact";
import { ContactService } from "./contact.service";

dayjs.extend(utc);

class AgentService {
  protected propertyService: PropertyService;
  protected contactService: ContactService;

  constructor() {
    this.propertyService = new PropertyService();
    this.contactService = new ContactService();
  }

  async signup(data: AgentAttributes) {
    let agent = await Agent.findOneAndUpdate({ email: data.email }, data, {
      new: true,
    });
    if (agent) return agent;

    if (!Boolean(data.contactOptions?.length)) {
      data.contactOptions = [{ type: "email", value: data.email }];
    }
    agent = await Agent.create(data);
    return agent;
  }
}

export default AgentService;
