# Disease TrenD Graph and Map Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Download the project and open the terminal in the project file. Once there execute `npm install`to install all dependencies. Wait untill everything is installed.

Then access to the file `/disease-trend-graph-map/src/app/app.module.ts` and change the `GOOGLE_MAPS_API_KEY` inside the code:
```
AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_MAPS_API_KEY',
      libraries: ['places']
      }),
```

Then run `ng serve` or `npm start`to compile the project and access to the url specified, normally: `http://localhost:4200/`.

## Summary
1. Change `GOOGLE_MAPS_API_KEY` inside `/disease-trend-graph-map/src/app/app.module.ts`.
2. Access to the project file in terminal.
3. `npm install`
4. `ng serve`
5. Open `http://localhost:4200/` in browser.
