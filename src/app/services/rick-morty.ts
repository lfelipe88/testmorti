// src/app/services/rick-morty.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface ApiResponse {
  results: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
