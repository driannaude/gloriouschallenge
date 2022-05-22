# Glorious Challenge - Drian

## Checklist

- [x] Build a responsive React application.
- [x] The application must have two pages navigated by URL.
- [x] The application must have a navigation bar at the top.
- [x] The navigation bar must become a hamburger menu on mobile resolutions.
- [x] The CSS of the menu and its responsiveness must be written by the developer.
- [x] Build a Node.js API that on boot connects to the CENNZnet blockchain via the CENNZnet API (@cennznet/api).
- [x] The API subscribes to 3 different chain state queries. Examples: Current block number; Name of an NFT collection (try collectionIds 55 and 62), or total Issuance of a generic asset (try asset ID 1002).
  - [x] Current block number
  - [x] Account Nonce
  - [x] Account Balance
  - [x] Name of NFT Collection
  - [x] NFT Collection token information
- [x] Each of the application pages must display data from the API.
- [x] The application and API must have adequate unit and functional test coverage.\*
- [x] the provider string for API connections to CENNZnet is wss://cennznet.unfrastructure.io/public/ws

# Bonus objectives

- [x] The page data changes when the blockchain data changes. This is easiest to see when displaying the current block number.
- [x] A CENNZnet address (try 5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9) may be entered into a form on a page causing information related to the address to be displayed.
- [x] The application may connect to the CENNZnet Chrome Extension

## Postmortem Notes

### Liberties taken

- I took a risk and loosely interpreted `The CSS of the menu and its responsiveness must be written by the developer` to mean I was allowed to use design systems outside of the menu/navbar, so I added @mui to speed up layout and design a little
- Instead of a standard REST or GraphQL API, I implemented a websocket API to aid with real time client updates
- I used `nx` to create a monorepo for the project. This helped me to create shared modules between the front- and backend and keep things organised at speed, as well as provide me with a starting point for a testing framework.
- I used `NestJS` as a backend framework to help me do some of the grunt work of setting up the API, deal with dependency injection and save time on a lot of setup tasks.

### What I think I did well

- The API design is clean, has good separation of concerns and using modules and DI I could ensure I kept bloat to a minimum
- The project is fairly well structured and component-ized.
- I managed to get some shared types/interfaces written to ensure type safety between the back and frontend
- I think I achieved a fair amount in the time allowed

### What I could have done better

- The UI - it's not very pretty, and I think due to lack of domain knowledge it's probably not very useful.
- Testing - I aimed for at least 80% test coverage, and for the most part achieved this for tested modules, but ran out of time to test everything thoroughly.
- Additionally, testing mocks could have been cleaner and more thought out.
- Error/exception handling
- I wasted a bit of time trying to implement end-to-end testing with cypress, probably should have abandoned this idea sooner.

### What I struggled with

- This was my first time testing a websocket API and I spent a good amount of time figuring out how to mock websocket requests, which could have been spent on polishing functionality and UI.
- I had a good amount of difficulty wrapping my head around the CENNZNet api and going in with no domain knowledge, I had to learn quickly. This mean that the utility of what I built isn't where I'd like it to be, and I'd argue while I achieved the goals set, I could have built something more useful for a specific use case given some more time to understand the domain better.

### Things I'd improve on if this were a real project

- spend more time understanding the domain and build something with a specific use case (e.g. A tool to mint & CENNZNet NFTs, A block explorer)
- Better error handling - verifying addresses before api requests, handling some uncaught exceptions I can think of as I type this
- Improve the UI - this is a given, there is always room for improvement here.
- Allow users to switch between the Main and Testnet.
- Use the wallet address when connecting to fetch dashboard information
- Add users' owned NFTs to the dashboard

### Summary

I think for a couple of days, learning about an entirely new domain/space, I did ok. It was definitely fun, and ultimately I think I delivered on most of the requirements, including some of the bonus requirements.

# Running the project

Start of with installing dependencies

```
npm i
```

To spin up the api

```
npx nx serve api
```

To spin up the UI

```
npx nx serve ui
```

Running tests

```
npx nx test {ui|api}
```

Run tests and output coverage to `coverage/packages/`

```
npx nx test {ui|api} --codeCoverage
```

# Workspace overview

Below is an overview of tooling and commands available in this project.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@glorious-challenge/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understanding dependency tree

Run `nx graph` to see a diagram of the dependencies of your projects.
