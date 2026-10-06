# AI Failure Audit

## Purpose

This document records AI-induced defects identified during the development of the Resilient Landing Page. Each defect was diagnosed, refactored, and verified through Git diff inspection, browser testing, or DevTools.

---

## Defect 1 — Countdown Timer Design

### 1. Defect Description

The initial AI-generated countdown implementation required careful verification because timer callbacks such as `setInterval()` can be delayed by browser scheduling and therefore should not be treated as the source of truth for the remaining time.

### 2. Diagnostic Method

The implementation was inspected through Git diff and browser testing. The countdown logic was checked to ensure that the remaining time was calculated from an absolute UTC timestamp instead of decrementing a counter by one second on every timer callback.

### 3. Refactored Solution

The countdown was implemented using a UTC ISO 8601 target timestamp:

```js
const targetTime = new Date(
    "2026-12-31T23:59:59Z"
).getTime();


The remaining time is recalculated from:
> AI can generate code. Developers are responsible for proving that it is correct.