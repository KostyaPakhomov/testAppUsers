export interface PeopleModel {
  "type": 'income' | 'outcome' | 'loan' | 'investment',
  "_id": string,
  "amount": number,
  "name": {
    "first": string,
    "last": string
  },
  "company": string,
  "email": string,
  "phone": string,
  "address": string
}
