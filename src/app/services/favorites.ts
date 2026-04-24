import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'verant_favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteIds = signal<string[]>(this.loadFromStorage());

  readonly favorites = this.favoriteIds.asReadonly();
  readonly count = computed(() => this.favoriteIds().length);

  isFavorite(id: string): boolean {
    return this.favoriteIds().includes(id);
  }

  toggle(id: string): void {
    const current = this.favoriteIds();
    const updated = current.includes(id)
      ? current.filter((fid: string) => fid !== id)
      : [...current, id];
    this.favoriteIds.set(updated);
    this.saveToStorage(updated);
  }

  private loadFromStorage(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(ids: string[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}
