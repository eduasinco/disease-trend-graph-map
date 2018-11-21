# Disease Trend Graph and Map Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Download the project and open the terminal in the project file. Once there execute `npm install`to install all dependencies. Wait untill everything is installed.

Then access to the file `src/environments/environment.prod.ts` and change the `API_KEY` inside the code:
```
export const environment = {
    production: true,
    API_URL: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?',
    GOOGLE_MAPS_API_KEY: 'API_KEY'
};
```

Then run `ng serve` or `npm start`to compile the project and access to the url specified, normally: `http://localhost:4200/`.

## Summary
1. Access to the project file in terminal.
2. `npm install`
3. Change `API_KEY` inside `src/environments/environment.prod.ts`.
4. `ng serve`
5. Open `http://localhost:4200/` in browser.
