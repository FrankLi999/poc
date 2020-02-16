import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Contact } from "../";
import { HttpErrorHandler, HandleError } from "./http-error-handler.service";
@Injectable({
  providedIn: "root"
})
export class ContactService1 {
  private contactsUrl = "app/contacts";
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private handleError: HandleError;
  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError("ContactService");
  }

  public getContacts(): any {
    return this.httpClient
      .get(this.contactsUrl)
      .pipe(catchError(this.handleError));
  }

  public getContact(id: number): Observable<Contact> {
    return this.getContacts().subscribe(contacts =>
      contacts.find(contact => contact.id === id)
    );
  }

  public save(contact: Contact): Observable<Contact> {
    if (contact.id) {
      return this.put(contact);
    }

    return this.post(contact);
  }

  public new(contact: Contact): Observable<Contact> {
    return this.post(contact);
  }

  public delete(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;
    return this.httpClient
      .delete<Contact>(this.contactsUrl, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  public post(contact: Contact): Observable<Contact> {
    return this.httpClient
      .post<Contact>(this.contactsUrl, JSON.stringify(contact), {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  public put(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.httpClient
      .put<Contact>(this.contactsUrl, JSON.stringify(contact), {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }
}
