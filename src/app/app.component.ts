import {Component, OnInit} from '@angular/core';
import {TableColumn} from 'simplemattable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  idSequence = 1;
  testData: Customer[];
  columns: TableColumn<any, any>[];

  ngOnInit(): void {
    const fnameColumn = new TableColumn<Customer, 'person'>('Firstname', 'person')
      .withTransform(person => person.firstname);
    fnameColumn.withFormField(fnameColumn.getTextFormField()
      .withInit(person => person.firstname)
      .withApply((firstname, person) => {
        person.firstname = firstname;
        return person;
      }));

    const lastnameColumn = new TableColumn<Customer, 'person'>('Lastname', 'person')
      .withTransform(person => person.lastname);
    lastnameColumn.withFormField(lastnameColumn.getTextFormField()
      .withInit(person => person.lastname)
      .withApply((lastname, person) => {
        person.lastname = lastname;
        return person;
      }));

    const emailColumn = new TableColumn<Customer, 'person'>('Email', 'person')
      .withTransform(person => person.email);
    emailColumn.withFormField(emailColumn.getTextFormField()
      .withInit(person => person.email)
      .withApply((email, person) => {
        person.email = email;
        return person;
      }));

    this.columns = [fnameColumn, lastnameColumn, emailColumn];
    this.testData = [];
  }

  addNewElement(): Customer {
    const customer = new Customer();
    customer.person = new Person();
    customer.address = new Address();
    return customer;
  }

  onAdd(element: Customer) {
    setTimeout(() => {
      element.id = this.idSequence;
      this.idSequence++;
      this.testData.push(element);
      this.testData = this.testData.slice(0);
    }, 1000);
  }

  onEdit(element: Customer) {
    setTimeout(() => {
      console.log('edit');
      console.log(element);
      this.testData[this.testData.findIndex(ctd => ctd.id === element.id)] = element;
      this.testData = this.testData.slice(0);
    }, 1000);
  }

  onDelete(element: Customer) {
    setTimeout(() => {
      this.testData.splice(this.testData.findIndex(ctd => ctd.id === element.id), 1);
      this.testData = this.testData.slice(0);
    }, 1000);
  }


}

class Customer {
  id: number;
  address: Address;
  person: Person;
}

class Address {
  street: string;
  city: string;
}

class Person {
  firstname: string;
  lastname: string;
  email: string;
}
