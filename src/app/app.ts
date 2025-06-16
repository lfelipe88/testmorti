import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

interface ApiResponse {
  results: Character[];
  info: { pages: number };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);

  characters = signal<Character[]>([]);
  totalPages = signal(0);
  page = signal(1);
  search = signal('');
  selectedCharacter = signal<Character | null>(null);

  constructor() {
    effect(() => {
      const currentPage = this.page();
      const currentSearch = this.search().trim();
      const url = `https://rickandmortyapi.com/api/character?page=${currentPage}${
        currentSearch ? `&name=${currentSearch}` : ''
      }`;

      this.http.get<ApiResponse>(url).subscribe({
        next: (res) => {
          this.characters.set(res.results);
          this.totalPages.set(res.info.pages);
        },
        error: () => {
          this.characters.set([]);
          this.totalPages.set(0);
        }
      });
    });
  }

  updateSearch(value: string) {
    this.search.set(value);
    this.page.set(1);
  }

  prevPage() {
    if (this.page() > 1) this.page.update(p => p - 1);
  }

  nextPage() {
    if (this.page() < this.totalPages()) this.page.update(p => p + 1);
  }

  openCharacter(id: number) {
    this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data) => {
      this.selectedCharacter.set(data);
    });
  }

  closeModal() {
    this.selectedCharacter.set(null);
  }
}
