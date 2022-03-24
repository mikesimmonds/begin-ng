# Layout Module

A layout module is a group of components that wrap the content in the page and poition the components in a consistent way.
Its good to keep this as lean as possible. Adding non-layout logic and services to it can cause it to bloat quickly.

A layout component will either contain a <router-link> or a <ng-content> element to diplay content in each if its sections.
for example:
```html
<!-- Example bgng-layout component -->
<bgng-top-nav></bgng-top-nav>
<div class="content">
  <ng-content></ng-content> <-- When used with content projection
  <router-outlet></router-outlet> <-- used with router
</div>
<bgng-bottom-nav></bgng-bottom-nav>
```

you can wrap a single component, a page or a whole module

Some layout components need to always be shown, even when the page is being routed. These should go into app.component

The following is a bit of a mystery:

The layouts can be used in 2 ways: 

- Content projection content in app.component.html or in the layout module This is preferred as it keeps the layouts 
- Use the router and router wrap the <router-outlet> there. In this case the layouts (above) should use ng-content and project the content:
```html 
<!-- app.component.html -->
<bgng-layout>
  <router-outlet></router-outlet>
</bgng-layout>

```

As a route component in the router.module.ts file with something like this:
``` ts
const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [{ path: ':id', component: AppComponent }],
  },
  { path: '**', component: PageNotFoundComponent },
];
```
