# Toshokan Web

This project is the client application of the `toshokan` application.

## Libraries and Tools

* [React](https://react.dev/);
* [Vite](https://vite.dev/);
* [ChakraUI](https://chakra-ui.com/);
* [React Router](https://reactrouter.com/);
* [React Icons](https://react-icons.github.io/react-icons/);
* [React Reader](https://github.com/gerhardsletten/react-reader);

## Objectives

This is a study front-end project, not meant primarily to be put in production. While I want to practice React, in this project I tried, as much as I could, to prevent the usage of third-party libraries and tools. Furthermore, the main objectives were:

* Separate the domain code from the dependencies by following [Anti-corruption Layer pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer).
* Adopt a more functional programming style over object-oriented.
* Better usage of React hooks (_useCallback_, _useMemo_, etc) to enhance rendering performance.
* Usage of native APIs over third-party implementations.

As seen in the [Libraries and Tools](#libraries-and-tools) section, I am using _ChakraUI_ as a component library, because creating a new set of visual components is not the purpose of this project. But even so, I tried to prevent using third-party components directly on the domain code. Every _ChakraUI_ used in this application is wrapped by my own components.

## Getting Started

To execute the project first run the `npm install` to download all the necessary dependencies.

```sh
$ npm install
```

Then is necessary to provide a `.env` file with the following fields:

```conf
VITE_API_URL=
```

The `VITE_API_URL` represents the API of the back-end application.

Then, execute the `dev` command.

```sh
$ npm run dev
```

## Source Code

The source code for this project is under the `/src` directory.

### Folder Structure

* __components__: generic functional React components that wrap third-party components.
* __config__: configuration data specific for this application.
* __features__: the core components of this application. This folder contains sub-directories each representing a specific context.
* __layout__: while __components__ folder is for generic components, this folder stores the generic but specific to this application's components.
* __shared__: contains types, hooks, and utilities that are not specific to a context.

## Documentation

The documentation of this project is present in `/docs` directory in [Markdown](https://www.markdownguide.org/) format.

### Date Format

The dates follow the standard `YYYY-MM-DD`. For example: The date June 20th, 1997 should be written as 1997-06-20.

### File Structure

* `journal.md`: contains just some annotations that were made during development.