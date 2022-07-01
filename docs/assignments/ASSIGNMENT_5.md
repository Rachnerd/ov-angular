# Assignment 5 Routing
If you want to catch up:

```
git checkout basic/assignment-5
```

## 5.1 Prepare App for routing

- Generate a new module:

```
ng generate module app-routing --flat --module=app
```

## 5.2 Home page
Let's create a home page.

- Generate a `HomeModule` that is imported by `AppModule`:

```
ng g m home --module=app
```

- Generate a `HomeComponent` that is exported by `HomeModule`:

```
ng g c home --export
```

## 5.3 Products overview

- Generate a module for products overview page:

```
ng g m products-overview --module=app
```

- Generate a component for products overview page:

```
ng g c products-overview --export
```

Now we have to decouple our app from all products related logic.

- Move the template and implementation of `AppComponent` to `ProductsOverViewComponent`. 
Don't forget to import `ProductsModule` in `ProductsOverviewModule` to gain access to the components.

## 5.4 Configuring routes

- Replace the content of `app-routing.module.ts` with:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- Wire `HomeComponent` to the root of the router:
```typescript
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
```

To be able to see the output of the router you must render a `router-outlet`.

- Replace `AppCompont` template with:

```html
<router-outlet></router-outlet>
```

You should see `home works!` on screen.

## 5.5 Child routes

- Add a `products` route to `AppModule` and lazy load the `ProductsOverviewModule`.

```typescript
{
  path: 'products',
  loadChildren: () =>
    import('./products-overview/products-overview.module')
      .then(m => m.ProductsOverviewModule)
}
```

In order to lazy load the products overview, all direct references to its code should be removed.

- Remove `ProductsOverviewModule` from `AppModule`'s imports and file import.

Referencing the lazy loaded module on itself is not enough. The lazy loaded module requires a route config so the router knows which component to render.

- Add a child route to `ProductsOverviewModule` and match root since `AppModule` already assigned a route.

```typescript
const routes: Routes = [
  { path: '', component: ProductsOverviewComponent}
];

@NgModule({
  declarations: [
    ProductsOverviewComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ProductsOverviewComponent]
})
export class ProductsOverviewModule { }
```

Visit `http://localhost:4200/products` and check if `ProductsOverviewComponent` is rendered. 

## 5.6 Navigation

- Add a simple navigation to `AppComponent` template:

```html
<nav>
  <a routerLink="/"
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact:true}">
    Home
  </a>
  <a routerLink="/products"
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact:true}">
    Products
  </a>
</nav>

<router-outlet></router-outlet>
```

`routerLinkActive` directive adds the `active` class to the element if that route is currently active.
`[routerLinkActiveOptions]="{exact:true}"` makes sure that `/` is not matched on route `/products`.

- Add css in `AppComponent` scss to highlight active route links:
```scss
.active {
  background-color: grey;
  cursor: auto;
}
```

You should now be able to navigate between pages.

- Check f12 Network tab to see lazy loading in action when navigation from `home` to `products` (only the first time). You should see
`ProductsOverviewModule` load in as JavaScript.

[Solution](https://github.com/Rachnerd/ov-angular/compare/basic/assignment-5...basic/assignment-6)
