import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl = 'http://www.github.com/mikesimmonds/begin-ng/branch/main/XXXXX';

  constructor() {}

  getTopics() {
    return of({
      categories: [
        {
          name: 'Forms',
          topics: [
            {
              name: 'Nested Forms',
              readmeUrl: 'www.google.com',
            },
            {
              name: 'Validation and validatin messages',
              readmeUrl: 'www.google.com',
            },
            {
              name: 'Form Controls',
              readmeUrl: 'www.google.com',
            },
            {
              name: 'Form Groups / Arrays',
              readmeUrl: 'www.google.com',
            },
          ],
        },
      ],
    });
  }
}
