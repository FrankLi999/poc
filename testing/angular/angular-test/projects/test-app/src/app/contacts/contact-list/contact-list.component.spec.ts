import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { ContactListComponent } from "./contact-list.component";
import { Contact, ContactService } from "../shared";
import { AppMaterialModule } from "../../shared/app.material.module";

import "../../../material-app-theme.scss";
describe("ContactListComponent", () => {
  let contactListComponent: ContactListComponent = null;
  const contactServiceStub = {
    contact: {
      id: 1,
      name: "janet"
    },

    save: function(contact: Contact): Observable<Contact> {
      // component.contact = contact;
      return of(contact);
    },

    getContact: function(id): Observable<Contact> {
      //component.contact = this.contact;
      return of(this.contact);
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [
        AppMaterialModule,
        FormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{ provide: ContactService, useValue: contactServiceStub }]
    });
    const fixture = TestBed.createComponent(ContactListComponent);
    contactListComponent = fixture.componentInstance;
  });

  it("should create the ContactListComponent", () => {
    expect(contactListComponent).toBeTruthy();
  });
});
