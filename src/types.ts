export interface Wish {
  id: string;
  sender: string;
  text: string;
  color: string; // Tailwind class
  date: string;
  rotation: number; // degrees for natural look
}

export interface ComicPage {
  age: string;
  title: string;
  dream: string;
  description: string;
  illustrationType: 'painter' | 'doctor' | 'journalist' | 'celebration';
  sunflowerCount: number;
}
