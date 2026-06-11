# Mental Clinic Admin Panel

Admin panel for the [Центр ментального здоров'я Євгена Скрипника](https://doctor-skripnik.com.ua) — built with Angular 18 and PrimeNG.

## Features

- **Articles** — create and edit posts with a Quill rich-text editor (images, videos, formatting)
- **Reviews** — moderate user-submitted reviews (approve / reject)
- **Contract** — edit the public offer contract via Quill
- **Team** — manage team member profiles
- **Tests** — manage psychological tests
- **Users** — view and manage registered users
- **Dashboard** — analytics overview
- **Auth** — login, password reset, invite-based registration with role-based access control

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 18 |
| UI components | PrimeNG 18 |
| Rich-text editor | Quill 2 |
| Styling | SCSS |
| HTTP | Angular HttpClient |

## Related Repositories

| Repo | Description |
|---|---|
| [mental-clinic-fe](https://github.com/DenysDatsiv/mental-clinic-fe) | Public-facing Angular frontend |
| [mental-clinic-be](https://github.com/DenysDatsiv/mental-clinic-be) | Express.js + MongoDB backend API |

## Getting Started

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

## Build

```bash
ng build
```

Build artifacts are output to `dist/`.

## Environment

Copy `src/environments/environment.ts` and configure the API URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```
