# Architecture

This is a reference documentation containing the definitions for concepts in `act`.

![Act overview](act-overview.png)

## Main Entities

### Tenants

A tenant is a container for service state.
Services controlled by a tenant should ultimately fetch their state from the tenant repo.

A tenant defines a list of **installed apps**. 
A service state is the **idempotent, immutable** result of building a given list of installed apps.

A tenant may define inline apps and reference them directly, without needing to create other repositories. This means a tenant may be a fully functioning, independent configuration repository. 

### Apps

Apps package builders, configs and runtimes so they can be installed in a tenant.

### Builders

### Configs

### Runtimes

## The act DSL

### Types of `act` files

In tenants: 

- `installed.act.ts` - determines installed apps in this Tenant.

In apps:

- `app.act.ts` - the manifest for this app, containing dependencies and declaring builders and configs.
- `config.act.ts` - exports configs to builders.
- `builder.act.ts` - defines a builder.
- `runtime.act.ts` - defines a runtime.

## The act.pm package manager

`act` files are fully functional `deno` scripts. This means they are executed by `deno`, leveraging it's dependency fetcher. However, `act` files may only import apps from `act.pm`.

## Tenant folder structure

Let's explore an example tenant folder structure with inline apps:

```sh
tenants/dreamstore/
  installed.ts
  apps/
    server/
      runtime.act.ts
      builder.act.ts
    home-page/
      config.act.ts
      home.tsx
    about-page/
      config.act.ts
      about.tsx
```

#### installed.ts



#### Inline apps

- server
- home-page
- about-page

## The deno and node runtimes

`act` ships with production-ready runtimes for `deno` and `node`.
This means you can run your `deno` or `node` app and let the runtime handle fetching and loading service state for you.

