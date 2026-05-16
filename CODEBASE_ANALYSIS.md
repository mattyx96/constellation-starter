# Codebase Analysis & Recommendations

This document outlines the current architectural state of the `constellation-starter` project, identifies critical pain points, and proposes improvements.

## Architectural Overview

The project follows a **Hexagonal/Clean Architecture** pattern:

- **`core/`**: Contains business logic, entities, and ports (interfaces). It is framework-agnostic.
- **`frontend/`**: React-based UI that implements adapters for the ports defined in `core` and handles infrastructure (API, Store, Routing).

---

## Identified Pain Points

### 1. Stale Dependencies in Dependency Injection (DI)

**Severity: Critical (Bug)**
The current DI implementation captures snapshots of stateful dependencies instead of live references.

- **Problem:** In `main.tsx`, `authStore` is registered as `resolve: () => authStore.getState()`. When a `FeatureClass` (like `AuthFeature`) is instantiated, it calls `resolveAll()`, which stores the _result_ of `getState()` in its `services` property.
- **Impact:** Logic like `AuthFeature.isLogged()` checks a stale object. If the user logs in and the store updates, the `FeatureClass` still sees the old, empty state.

### 2. Manual Form Management vs. Library Usage

**Severity: Medium**
The project has a custom `FormService` and `useForm` hook in `frontend/src/infrastructure/form`.

- **Problem:** It manually manages validation state, Zod integration, and submission lifecycle.
- **Impact:** High maintenance overhead. Interestingly, `@tanstack/react-form` is present in `package.json` but is currently unused, leading to "reinventing the wheel."

### 3. DI System Boilerplate & Redundancy

**Severity: Medium**

- **Problem:** Each `FeatureClass` instantiates its own `DependencyContainer` in its property initializer. While the container itself uses a `@Singleton` decorator, the way it's used makes unit testing difficult (hard to inject mocks) and adds unnecessary complexity to simple feature classes.
- **Impact:** High cognitive load and boilerplate for adding new features.

### 4. Build Flow Inefficiencies

**Severity: Low/Medium**

- **Problem:** `frontend` depends on the `dist` folder of `core`.
- **Impact:** Changes in `core` require a rebuild (even if watched) before the frontend reflects them. This slows down the development cycle and Hot Module Replacement (HMR).

### 5. Error Handling Inconsistencies

**Severity: Low**

- **Problem:** In `AuthFeature.ts`, errors are reported using `createSuccessToaster`.
- **Impact:** Poor UX; error messages are styled as success notifications.

### 6. Code Hygiene & Testing

**Severity: Medium**

- **Problem:**
  - No unit tests in `core` (where business logic resides).
  - Hardcoded debug logs (`console.log("ciao")`) and placeholder calls (`createSuccessToaster("test")` in `initCore`) are present in the source code.

---

## Recommended Roadmap

### Phase 1: Stability & Bug Fixes

- [x] **Fix DI Stale State**: Refactored `FeatureClass` to use a Proxy for lazy resolution of services from the `DependencyContainer`.
- [x] **Fix Toaster Usage**: Corrected the logic in `AuthFeature` to use appropriate toast types (renamed to `createToast`).

### Phase 2: Refactoring & Simplification

- [ ] **Adopt TanStack Form**: Replace the custom `FormService` with `@tanstack/react-form` to reduce local codebase complexity.
- [ ] **Streamline DI**: Simplify the `FeatureClass` initialization to make it more test-friendly and reduce boilerplate.

### Phase 3: Developer Experience (DX)

- [x] **Improve Monorepo Links**: Configured Vite and TypeScript to use source files for `core` instead of pre-built `dist` files during development.
- [ ] **Add Unit Tests**: Implement Vitest in `core` and add tests for `AuthFeature`.
- [x] **Cleanup**: Removed "ciao" logs and test toaster calls from initialization.
