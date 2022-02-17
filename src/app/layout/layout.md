# Layout Module

A layout module is a group of components that wrap the content in the page and poition the components in a consistent way.

A layout component will either contain a <router-link> or a <ng-content> element to diplay content in each if its sections.
for example:
```html
<!-- Example layout component -->
<div class="content">
  <ng-content></ng-content> <-- When used with content projection
  <router-outlet></router-outlet> <-- used with router
</div>
<bgng-top-nav></bgng-top-nav>
<bgng-bottom-nav></bgng-bottom-nav>
```

The layouts can be used in 2 ways: 

As projected content in app.component.html and wrap the <router-outlet> there. In this case the layouts (above) should use ng-content and project the content:
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
