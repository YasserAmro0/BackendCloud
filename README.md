# BackendCloud
## Sessions Feature

This project now includes session-related stubs under existing folders:

- `src/controllers/sessions.ts`: Express handlers for creating, fetching, deleting sessions.
- `src/services/sessions.ts`: Business logic stubs. Replace in-memory parts with DB.
- `src/models/sessions.ts`: TypeScript interface for `Session`.
- `src/types/sessions.ts`: Payload types used by controllers/services.
- `src/routes/sessions.ts`: REST routes mounted by the application.

To integrate with a database, wire `getSessionById` and `revokeSession` to your ORM/queries. If your upstream code requires additional configs or env variables, add them to `.env` and mirror in `example.env`.