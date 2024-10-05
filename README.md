# lab2-integrador-jofre-rigg

TUDS-B-24 Laboratorio de Programación II: Proyecto Integrador

## Start app.js

Run from the app folder.

Install dependencies:
```bash
npm install
```

List dependencies:
```bash
jq -r '.dependencies | to_entries[] | "npm install \(.key)@\(.value)"' package.json
```

#### Dev mode on localhost (nodemon)

```bash
npm run dev
```

#### Autocompile SASS

```bash
npm run sass
```

#### Production mode on remote host

```bash
npm start
```
