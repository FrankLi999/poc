import { TestBed } from "@angular/core/testing";
import { ContactsComponent } from "./contacts.component";
import { Contact } from "./shared/";

describe("ContactsComponent", () => {

  let contactsComponent: ContactsComponent = null;

  beforeEach(() => {
    const fixture = TestBed.createComponent(ContactsComponent);
    contactsComponent = fixture.componentInstance;
  });

  it("should create the ContactsComponent", () => {
    expect(contactsComponent).toBeTruthy();
  });

  it("should be no contacts if there is no data", () => {
    expect(contactsComponent.contacts.length).toBe(0);
  });

  it("should be contacts if there is data", () => {
    const newContact: Contact = {
      id: 1,
      name: "Jason Pipemaker"
    };
    const contactsList: Array<Contact> = [newContact];
    contactsComponent.contacts = contactsList;

    expect(contactsComponent.contacts.length).toBe(1);
  });
});
