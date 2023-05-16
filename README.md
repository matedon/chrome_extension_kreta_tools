# eKretaMin
![Logo (icon)](logo/logo-128.png?raw=true "Logo (icon)")
### Chrome Extension for E-Kreta
Chrome Extension Manifest V3 version is dead due to restrictions.
This code needs to access the target website's JavaScript variables.
```
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval'".
Either the 'unsafe-inline' keyword, a hash ('sha256-OtJXBy1Ny7gaG+DX3UwPqX+ypJ+eLEKC9QSBdOMsJnc='),
or a nonce ('nonce-...') is required to enable inline execution.
```
In theory Manifest V2 still capable to solve this issue. Until 2024 january.

https://developer.chrome.com/docs/extensions/migrating/mv2-sunset/

So let's Back to the Future and implement this project in Manifest V2...