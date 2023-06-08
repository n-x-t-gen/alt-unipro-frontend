export interface User {
  id: number;
  name: string;
  birthdate: string;
  sex: string;
  email: string;
  contact: string;
  cpf: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
}

export interface Event {
  id: number;
  name: string;
  state: boolean;
  date: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetails {
  event: {
    id: number;
    name: string;
    state: boolean;
    date: string;
    location: string;
    policy: string;
    description: string;
    bannerEvent: string | null;
    createdAt: string;
    updatedAt: string;
    ticket: {
      id: string;
      name: string;
      price: string;
      startDate: string;
      finishDate: string;
      eventId: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}


export interface Sponsors {
  id: number;
  name: string;
  url?: string;
  image: string;
}

export interface InfoCard {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface Publication {
  id: number;
  title: string;
  headline: string;
  publicationDate: string;
  author: string;
}

export interface LoginData {
  user: string; // Alterado de "login" para "user"
  password: string;
}