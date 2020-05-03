import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'

import { HttpClient } from '@angular/common/http';

import { QueueStatus } from 'src/models/status';
import { ChannelDiscovery, ListDiscovery } from 'src/models/discovery';
import { Router } from '@angular/router';

const AUTH_TOKEN_STORAGE_KEY = "ytpm-auth";

@Injectable({
  providedIn: 'root'
})
export class YtpmService {
  private baseUrl = '/api/client';
  private token: string;

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
    this.token = storage.get(AUTH_TOKEN_STORAGE_KEY);
  }

  getStatus(lastUpdate: number = 0): Observable<QueueStatus> {
    const url = this.buildUrl(`${this.baseUrl}/a/poll/v2`, {
      'token': this.token,
      'since': `${lastUpdate}`
    })

    return this.http.get<QueueStatus>(url).pipe(
      catchError(this.handleError<QueueStatus>('getStatus'))
    );
  }

  getChannels(): Observable<ChannelDiscovery[]> {
    const url = this.buildUrl(`${this.baseUrl}/discovery/channels`);
    return this.http.get<ChannelDiscovery[]>(url);
  }

  getLists(): Observable<ListDiscovery[]> {
    const url = this.buildUrl(`${this.baseUrl}/discovery/lists`);
    return this.http.get<ListDiscovery[]>(url);
  }

  getQueue(): Observable<any> {
    const url = this.buildUrl(`${this.baseUrl}/a/queue_state`, {
      'token': this.token,
    });

    return this.http.get(url);
  }

  getHistory(): Observable<any[]> {
    const url = this.buildUrl(`${this.baseUrl}/a/play_history`, {
      'token': this.token,
    });

    return this.http.get<any[]>(url);
  }

  getAutoComplete(term: string): Observable<string[]> {
    const url = this.buildUrl(`${this.baseUrl}/autocomplete`, {
      'q': term
    });

    return this.http.get<string[]>(url);
  }

  getSearchResults(term: string, page?: string): Observable<any> {
    const url = this.buildUrl(`${this.baseUrl}/search`, {
      'q': term,
      'page': page
    });

    return this.http.get<any>(url);
  }

  sendCommand(command: string) {
    const url = this.buildUrl(`${this.baseUrl}/a/send_command`, {
      'token': this.token
    });

    this.http.post(url, {command: command}).subscribe(() => undefined);
  }

  checkToken(): Observable<{valid: boolean}> {
    if (!this.token) {
      return of({valid: false});
    }

    const url = this.buildUrl(`${this.baseUrl}/auth/validate`, {
      'token': this.token,
    });

    return this.http.get<{valid: boolean}>(url);
  }

  auth(name: string, key: string): Observable<{token: string}> {
    const url = this.buildUrl(`${this.baseUrl}/auth`, {
      'auth': key,
      'name': name,
    });

    return this.http.get<{token: string}>(url).pipe(
      tap((response) => this.setToken(response.token))
    )
  }

  deauth() {
    if (!this.token) {
      return;
    }

    const url = this.buildUrl(`${this.baseUrl}/a/deauth`, {
      'token': this.token
    });

    console.log(url);

    this.http.get(url).subscribe(() => undefined);
    this.storage.remove(AUTH_TOKEN_STORAGE_KEY);
  }

  addToQueue(args: {videoId: string, front?: boolean, noinfluence?: boolean}) {
    const url = this.buildUrl(`${this.baseUrl}/a/enqueue`, {
      'token': this.token,
      'videoId': args.videoId,
      'next': args.front ? 'true' : undefined,
      'noinfluence': args.noinfluence ? 'true' : undefined,
    })

    console.log(url);
    return this.http.get(url);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status === 401) {
        console.error('Recieved UNAUTHORIZED from server. Redirecting to connect page.');
        this.router.navigateByUrl('/connect');
      }
      return of(result as T)
    };
  }

  private setToken(token: string){
    this.storage.set(AUTH_TOKEN_STORAGE_KEY, token);
    this.token = token;
  }

  private buildUrl(base: string, params: {[key: string]: string} = {}): string {
    let url = base;

    let first = true;

    for (const key in params) {
      const value = params[key];
      if (params.hasOwnProperty(key) && value) {
        url += `${first ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        first = false;
      }
    }

    return url;
  }
}
