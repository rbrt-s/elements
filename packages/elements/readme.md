# @inovex/elements

This is a package containing native and reusable Web components.

## Usage
There are two ways to add inovex elements to your project. By loading them via `script` tag from a central server or by
downloading them via npm and adding them to your build process. 

If you are building a single page application, integration with your build process makes sense, if you are just playing around, use
the central server.

### Script Tag
Add the following snippet to your html file

```
<script src="https://elements.inovex.io/dist/latest/inovex-elements.js"></script>
```

This preloader will only lazy load components you use. So if you only use `<ino-button>`, the script will just load the
button for you when needed. Nothing more.

The first part of the path defines the loaded version of the inovex elements. `latest` always contains the most current
state and may receive breaking changes. To load a stable version like `0.9.0`, use `https://elements.inovex.io/dist/v0.9.0/inovex-elements/inovex-elements.esm.js`.

The inovex elements components are lazy loaded, which means you have to import the main js file `dist/v0.9.0/inovex-elements/inovex-elements.esm.js` containing the component
registry and everything else will be handled on the fly. To support older Browsers it is recommended to set the differential scripts in the head as follows:

```
<script type="module" src="https://elements.inovex.io/dist/v0.9.0/inovex-elements/inovex-elements.esm.js"></script>
<script nomodule="" src="https://elements.inovex.io/dist/v0.9.0/inovex-elements/inovex-elements.js"></script>
```

### Integrate via npm

inovex elements are delivered via a private npm registry hosted at `https://artifactory.inovex.de/artifactory/api/npm/inovex-elements/`. First, you have to configure
your local environment to use this registry. To do so, execute the following npm commands:

```
npm config set registry https://artifactory.inovex.de/artifactory/api/npm/internal-npm/
or
npm config set @inovex:registry https://artifactory.inovex.de/artifactory/api/npm/internal-npm/
```

Now you are ready to add the `@inovex/elements` dependency to your project using `yarn` or `npm`:
```
yarn add @inovex/elements
npm i @inovex/elements
```

## Getting started
In most cases, the integration of inovex elements requires two steps:

#### 1) Copy `dist` folder of `inovex-elements` dependency to project's assets

If you are using webpack and provide your own webpack config file, you can use the provided `webpack-plugin.js` as a plugin
and the elements will be provided automatically. You just have to import the component registry as part of your main bundle:

```javascript
// webpack.config.js

module.exports = {
    //...
    plugins: [ /* ... */, require('@inovex/elements/webpack-plugin')()]
}
```
If the final javascript bundle is not located in the root of the web root, you have to specify the path as the first parameter,
e.g. if your javascript bundle is located in `static/js`, use `require('@inovex/elements/webpack-plugin')('static/js')`.

#### 2) Load the elements module in entrypoint file

```javascript
// entrypoint file

import '@inovex/elements';
```

## Contributing
> TODO

## Technologies

### Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

### Storybook

[Storybook](https://github.com/storybooks/storybook) is a development environment for UI components. It allows us to browse the inovex elements, view the different states of each component, and interactively develop and test inovex components.

The storybook is part of the development process and used to test the components as well as to show the most common use cases.

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)