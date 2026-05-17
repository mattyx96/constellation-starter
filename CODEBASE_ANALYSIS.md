# Constellation Starter — Codebase Analysis Report

> **Date:** 2026-05-16  
> **Scope:** Full monorepo (`core`, `frontend`, `packages/eslint-prettier-config`)

---

## Executive Summary

The codebase follows a **Clean / Hexagonal Architecture** split between a framework-agnostic `core` package and a React `frontend`. While the architectural intent is sound, several **critical runtime bugs**, **broken build/tooling scripts**, and **structural anti-patterns** undermine reliability and scalability. There are currently **zero tests** despite test dependencies being installed.

---

## 🔴 Critical / High Severity

### 1. Broken Dependency Injection for Zustand Stores

**Location:** `frontend/src/main.tsx`  
**Issue:** `authStore` is registered in the DI container as:

```ts
authStore: {
  resolve: () => authStore.getState();
}
```

This resolves to a **state snapshot** at initialization time, not the store itself. When `AuthFeature.isLogged()` reads `this.services.authStore.token`, it always sees the initial empty string `''` because the DI container holds a stale reference. The `saveAuth` action happens to work because the function closure still references the original Zustand `setState`, but any direct property access is broken.

**Fix:** Register the store instance itself (`authStore`), not `authStore.getState()`, and update `IAuthStorePort` access patterns accordingly.

---

### 2. `AuthFeature` Instantiated on Every Render

**Location:** `frontend/src/features/auth/pages/login.tsx`  
**Issue:** `const authFeature = new auth.AuthFeature();` lives inside the component body. It is **not** decorated with `@Singleton`, so every keystroke or re-render constructs a new instance, which eagerly calls `container.resolveAll()` and iterates all dependencies. This is pure overhead and can cause subtle bugs if instance state ever creeps in.

**Fix:** Decorate `AuthFeature` with `@Singleton`, or memoize the instance with `useMemo` / module-level singleton.

---

### 3. Flawed Singleton Decorator

**Location:** `core/src/misc/decorators/Singleton.ts`  
**Issue:**

- `let instance: T;` — `T` is the constructor type, not the instance type (type-unsafe).
- Returning an object from a constructor replaces `this`, which TypeScript doesn't model, causing type mismatches.
- Static properties/methods on the original class are lost.

**Fix:** Use a proper singleton pattern (module-level const, or a robust decorator that preserves prototype chain).

---

### 4. Incorrect Axios Generics & Lost Type Safety

**Location:** `frontend/src/features/auth/infrastructure/api/auth-service/authApiService.ts`  
**Issue:**

```ts
HttpClient.post<AxiosResponse<LoginResponseDto>, AxiosResponse, LoginRequestDto>(...)
```

Axios generics are `<ResponseData, Response, RequestBody>`. By passing `AxiosResponse<LoginResponseDto>` as the first generic, the resolved `response.data` becomes untyped (`any`). The DTO-to-domain adapter then operates on `any`.

**Fix:** Use `HttpClient.post<LoginResponseDto>(...)` or let Axios infer types.

---

### 5. Broken Root Package Scripts

**Location:** `package.json`  
**Issues:**

- `"fix": "pnpm lint:fix . && pnpm format"` — script `lint:fix` does **not** exist (it's `lint-fix`). This will error.
- `"fresh": "pnpm clean && pnpm i"` — script `clean` does **not** exist. This will error.

---

### 6. ESLint Shared Config Peer Dependency Mismatch

**Location:** `packages/eslint-prettier-config/package.json`  
**Issue:** Peer dependencies specify `eslint: ^7.32.0` and `prettier: ^2.3.2`, but the monorepo uses `eslint: ^9.17.0` (flat config) and `prettier: ^3.4.2`. This is a **major version conflict**. It also redundantly includes both legacy `@typescript-eslint/*` packages and the new `typescript-eslint` v9 package.

**Fix:** Update peer deps to match actual versions, remove redundant `@typescript-eslint` packages.

---

## 🟠 Medium Severity

### 7. Zero Tests Despite Test Infrastructure

**Location:** Entire repo  
**Issue:** Vitest, `@testing-library/react`, and `happy-dom` are installed, but there are **0 test files**. The root `test` script exits with an error. `frontend/.vitest/setup.ts` references an undefined `matchers` variable, so even if tests were added, the setup is broken.

**Fix:** Write unit tests for `core` business logic (ports/adapters) and component tests for `frontend`. Fix the setup file.

---

### 8. ToastService Side Effects in Constructor

**Location:** `frontend/src/infrastructure/toast/toastService.ts`  
**Issue:** The constructor starts a `setInterval` that runs forever (no cleanup). Every time `new ToastService()` is called (which happens in `main.tsx` at boot), another interval leaks. With the current singleton, it's only called once, but it's fragile.

**Fix:** Move interval management into an explicit `start()` / `dispose()` lifecycle, or use a time-based filter in the React component.

---

### 9. Misleading Toast API

**Location:** `core/src/ports/IToastServicePort.ts` and `authFeature.ts`  
**Issue:** The method is named `createSuccessToaster`, but `authFeature.ts` calls it inside the `catch` block to display errors. The port name implies success-only usage.

**Fix:** Rename to `createToaster(message, type)` or split into `createSuccessToaster` / `createErrorToaster`.

---

### 10. Core Build Config Error

**Location:** `core/vite.config.ts`  
**Issue:** `minify: isProd` is placed inside `lib: {}`, which is not a valid Vite `lib` option. Vite ignores it. Minification should be at `build.minify`.

---

### 11. Inconsistent Build Output Directories

**Location:** `core/vite.config.ts` vs `frontend/vite.config.ts`  
**Issue:** `core` builds to `core/dist/`, while `frontend` builds to `root/dist/`. This is confusing and can cause collision issues if `core` were ever configured to output to root.

---

### 12. Missing `types` Condition in `exports`

**Location:** `core/package.json`  
**Issue:** The `exports` field only defines `import`, not `types`. Modern TypeScript and bundlers prioritize `exports` over `main`/`types`. Type resolution may fail in strict ESM environments.

**Fix:** Add `"types": "./dist/index.d.ts"` inside the `exports.import` condition.

---

### 13. React Version Not Specified for ESLint

**Location:** `frontend/eslint.config.js`  
**Issue:** `eslint-plugin-react` warns: _"React version not specified"_. This causes JSX-related rules to behave incorrectly (e.g., `react/no-deprecated` won't know which React version to check against).

**Fix:** Add `settings: { react: { version: 'detect' } }` to the ESLint config.

---

### 14. Hardcoded API URLs & Credentials

**Locations:** `HttpClient.ts`, `authApiService.ts`, `formStore.ts`  
**Issues:**

- `baseURL` is hardcoded to `https://dummyjson.com`.
- The login endpoint is also hardcoded with the full URL, ignoring the `baseURL`.
- Default credentials (`emilys` / `emilyspass`) are committed in `formStore.ts`.

---

### 15. Protected Route Logic Disabled

**Location:** `frontend/src/infrastructure/router/router.tsx`  
**Issue:** `<ProtectedRoute>` is commented out, so the entire auth guard is bypassed. The `isLogged` method on `AuthFeature` is effectively dead code.

---

### 16. Multiple Unused Dependencies

**Location:** `frontend/package.json`  
**Issue:** The following packages are installed but never imported/used:

- `immer`
- `i18next`, `react-i18next` (no i18n setup)
- `@tanstack/react-form`, `@tanstack/zod-form-adapter` (custom `FormService` is used instead)

**Impact:** Bloats install time and bundle size (though tree-shaking helps, unused deps still increase maintenance surface).

---

## 🟡 Low Severity / Code Quality

### 17. Production Debug Logs

**Location:** `core/src/features/auth/index.ts`  
**Issue:** `console.log("ciao");` in a barrel file executes on every import of the `auth` namespace.

---

### 18. Artificial Delays in Business Logic

**Location:** `core/src/features/auth/authFeature.ts`  
**Issue:** `await sleep(1000)` is hardcoded before and after the API call. This should not live in the core business logic; if needed for UX, it belongs in the presentation layer (e.g., loading states).

---

### 19. Tailwind Custom Class Warnings

**Location:** Multiple components (`dashboard.tsx`, `PageLayout.tsx`, etc.)  
**Issue:** Classes like `header1`, `display2`, `body1`, `body3`, `header6` come from the Nebula UI library but trigger `tailwindcss/no-custom-classname` warnings. The ESLint rule is fighting the design system.

**Fix:** Add Nebula's class prefixes to the `tailwindcss/classnames-order` safelist, or disable `no-custom-classname` for known design system classes.

---

### 20. Two React Roots

**Location:** `frontend/src/main.tsx`  
**Issue:** Two separate `createRoot` calls render into `#root` and `#toast`. This breaks React 18 concurrent features, context propagation, and error boundaries. The toaster should live inside the app tree (e.g., via a portal).

---

### 21. `eqeqeq: 'off'` in ESLint Config

**Location:** `packages/eslint-prettier-config/eslint.config.js`  
**Issue:** Loose equality (`==`) is allowed project-wide. In a TypeScript codebase, `===` should be enforced.

---

### 22. `pnpm-workspace.yaml` References Missing Directory

**Location:** `pnpm-workspace.yaml`  
**Issue:** Includes `apps/*` but no `apps/` directory exists. Harmless but sloppy.

---

### 23. `Toaster` Uses Array Index as Key

**Location:** `frontend/src/infrastructure/toast/toaster.tsx`  
**Issue:** `{toasters.map((toaster, index) => (<div key={index} ... />))}`. If toasts are removed out of order, React will misidentify elements.

**Fix:** Generate a unique ID for each toast (e.g., `crypto.randomUUID()` or a counter).

---

### 24. `useForm` Creates New `FormService` Every Render

**Location:** `frontend/src/infrastructure/form/useForm.ts`  
**Issue:** `new FormService<T>(...)` is called on every render without `useMemo`. While the class is lightweight, this is unnecessary overhead.

---

## Summary Table

| Category              | Count | Top Priority Fix                                     |
| --------------------- | ----- | ---------------------------------------------------- |
| **Architecture / DI** | 4     | Fix `authStore` DI snapshot bug                      |
| **Build / Tooling**   | 5     | Fix root scripts & core `exports.types`              |
| **Code Quality**      | 6     | Remove `console.log`, hardcoded sleeps, dead code    |
| **Dependencies**      | 2     | Remove unused deps, fix peer dep versions            |
| **Testing**           | 1     | Add tests or remove broken test infra                |
| **React / Frontend**  | 5     | Memoize feature instances, fix two-root anti-pattern |

---

## Recommendations

1. **Stabilize DI & Singletons first** — these are silent runtime bugs that will grow worse as more features are added.
2. **Fix build scripts and package metadata** — broken scripts erode developer trust and CI reliability.
3. **Remove or utilize test infrastructure** — either write tests for core business logic or strip the broken setup to reduce noise.
4. **Audit dependencies quarterly** — unused packages (`immer`, `i18next`, `@tanstack/react-form`) should be pruned.
5. **Enforce stricter ESLint rules** — turn `eqeqeq` back on, fix `no-unused-vars` warnings, and configure Tailwind to ignore design-system classes.
