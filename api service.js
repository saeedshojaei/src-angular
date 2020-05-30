import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NbTokenService } from '../auth/services/token/token.service';
import { NbToastrService } from '@nebular/theme';

interface SuccessApiResponse {
	status: string;
	message?: string;
	data?: object;
}

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private baseUrl: string = 'http://192.168.10.197:8081/api/v1/';
	private headers: HttpHeaders;

	constructor(private http: HttpClient,
				protected tokenService: NbTokenService,
				private toastrService: NbToastrService) {
		this.tokenService.get().subscribe(res => {
			const token: string = res['token'];
			this.headers = new HttpHeaders({
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			});
		});
	}
	handleError = (error: HttpErrorResponse) => {
		if (error.status === 404 || error.status === 500) {
			this.toastrService.danger(error.error.message, error.statusText);
			return throwError(undefined);
		} else if (error.status === 400) {
			this.toastrService.danger(error.error.message, error.statusText);
			return throwError(error.error);
		}
		return error.error.message;
	}

	handleSuccess = (data) => {
		if (data.message) {
			this.toastrService.success(data.message, 'success');
		}
		return data.data ? data.data : data;
	}

	public get(endpoint: string, params?: {[key: string]: string}): Observable<any> {
		const options = {
			headers: this.headers,
			params: new HttpParams(),
		};
		for (const key in params) {
			if (params[key]) {
				options.params = options.params.append(key, params[key]);
			}
		}

		return this.http.get<SuccessApiResponse>(this.baseUrl + endpoint, options)
        .pipe(
        	map(this.handleSuccess),
        	catchError(this.handleError),
        );
	}
	public patch(endpoint: string, body: any): Observable<any> {
		const options = {
			headers: this.headers,
		};
		return this.http.patch<SuccessApiResponse>(this.baseUrl + endpoint, body, options)
			.pipe(
				map(this.handleSuccess),
				catchError(this.handleError),
			);
	}
	public post(endpoint: string, body): Observable<any> {
		const options = {
			headers: this.headers,
		};
		return this.http.post<SuccessApiResponse>(this.baseUrl + endpoint, body, options)
			.pipe(
				map(this.handleSuccess),
				catchError(this.handleError),
			);
	}
	public delete(endpoint: string, id: number): Observable<any> {
		const options = {
			headers: this.headers,
		};
		return this.http.post<SuccessApiResponse>(this.baseUrl + endpoint + '/' + id , options)
			.pipe(
				map(this.handleSuccess),
				catchError(this.handleError),
			);
	}

}
