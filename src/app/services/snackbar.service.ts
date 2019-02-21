import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export default class SnackBarService {
    constructor(private snackBar: MatSnackBar){}
    openSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 10000
        });
    }
};