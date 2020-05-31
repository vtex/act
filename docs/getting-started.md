# Getting started

Let's implement a simple `deno` service and make it configurable by:

- Creating a tenant, a container for the generated configuration state.
- Declaring a builder that accepts configs
- Exporting a couple of configurations for this builder
- Building a versioned service state from the configs
- Importing said state into our application to determine service behaviour
- Installing apps to manage service behaviour

## Pre-requisites

If you haven't done so, go and [install Deno](https://deno.land) and [setup git](https://help.github.com/en/github/getting-started-with-github/set-up-git).

## Creating an example service

If you haven't done so, go and [install Deno](https://deno.land).

Our example deno service will be an `act-slogan-generator` which combines a set of words that start with the letters `a`, `c` and `t` to generate a three-word `act` slogan.

First, let's create a folder for our app:

```sh
> mkdir apps
> mkdir apps/act-slogan-generator
> cd apps/act-slogan-generator
```

Create the file `server.ts` with this script:

```ts
import { listenAndServe, ServerRequest } from "https://deno.land/std@v0.54.0/http/server.ts";
import { readJson } from "https://deno.land/std@v0.54.0/fs/mod.ts";

type ServiceState = Record<string, string[]>

const stateFilePath = await Deno.realPath("./state.json");
const state = await readJson(stateFilePath) as ServiceState

console.log(`Server: http://localhost:8000/`);
console.log(`State:`, state);

listenAndServe({port: 8000}, (req: ServerRequest) => {
  const keys = Object.keys(state) // [a, c, t]
  const lengths = keys.map((k: string) => state[k].length) // [2, 2, 3]
  const selectedIndexes = lengths.map((l: number) => Math.floor(Math.random() * l)) // [0, 0, 1]
  const selectedWords = keys.map((k: string, index: number) => state[k][selectedIndexes[index]]) // [app, config, tool]
  req.respond({ body: selectedWords.join(' ') });
})
```

And create a `state.json` file with this content: 

```json
{
  "a": ["app", "automatic"],
  "c": ["config", "creates"],
  "t": ["tree", "tool", "trust"]
}
```

Now, run the script with 

```sh
> deno run --allow-net --allow-read --unstable server.ts
```

This should produce the following output: 

```sh
Compile file:///Users/guilherme/Projects/deno/apps/act-slogan-generator/server.ts
Server: http://localhost:8000/
State: {
  a: [ "app", "automatic" ],
  c: [ "config", "creates" ],
  t: [ "tree", "tool", "trust" ]
}
```

Now, check your server works by calling it with curl: 

```sh
> curl http://localhost:8000
app config tree
```

Great! Now we have a working server that reads state from a local file.
With `act`, we can compose this state by installing multiple `apps`, allowing us to control the service behaviour.

## Creating a tenant

The `act` CLI acts on two types of repositories: `tenants` and `apps`. Tenants are the containers for service state. Apps package configuration to be installed in tenants. 

Our first step, therefore, is to declare a `tenant` by running, in an empty folder:

```sh
> act init
```

This will initialize an empty git repo and create an empty `installed.act.ts` file.

*TIP:* All files managed by `act` have the `.act.ts` extension, indicating they implement the act DSL and only import packages from the `act.pm` package manager.

## Declaring a builder

## Exporting configurations

## Building a service state

## Importing the service state

## Using the native deno runtime

## Installing apps to control behaviour


