import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

import phonebook from './phonebook.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContactComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  contacts: Contact[] = phonebook;
  filterByText: string = '';

  private removeAccents(txt: string): string {
    return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterContactsByText(): Contact[] {
    if (!this.filterByText) {
      return this.contacts;
    }
    return this.contacts.filter((contact) => {
      return this.removeAccents(contact.name)
        .toLowerCase()
        .includes(this.removeAccents(this.filterByText).toLowerCase());
    });
  }

  filterContactsByFirstLetter(letter: string): Contact[] {
    return this.filterContactsByText().filter((contact) => {
      return this.removeAccents(contact.name)
        .toLowerCase()
        .startsWith(this.removeAccents(letter).toLowerCase());
    });
  }
}
