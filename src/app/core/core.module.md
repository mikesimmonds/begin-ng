The core modules holds modules and services which are used as singletons in the application. This helps keep the app.module very clean and thin (good).

Standard Things here are:
 - Global error handling
 - Global message handling (alerts)
 - Analytics services
 - Interceptors

I also think its ok to have non-routed/error components here, such as the 404 page as otherwise they would go into the top level as they are not part of any feature module and are not shared.



