import Contact, { ContactAttributes } from "../models/contact";

export class ContactService {
  async create(data: ContactAttributes) {
    return await Contact.create(data);
  }
  async findById(id: string) {
    return await Contact.findById(id);
  }
  async findByEmail(email: string) {
    return await Contact.findOne({ email });
  }
}
