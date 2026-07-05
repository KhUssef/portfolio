# Portfolio

Personal portfolio and CV for Youssef Khalifa. Next.js (App Router) + TypeScript + Tailwind CSS
v4, deployed free on Vercel.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editing content

All content is data-driven - edit these files, not the components:

- `data/profile.ts` - name, role, tagline, about, contact, social links.
- `data/projects.ts` - one object per project. Add a project by appending to the array.
- `data/skills.ts` - skills grouped by category.

## Build and deploy

```bash
npm run build    # must pass before deploying
```

Push to the connected GitHub repo. Vercel (Hobby plan, free) builds and deploys automatically.
No environment variables are required.
