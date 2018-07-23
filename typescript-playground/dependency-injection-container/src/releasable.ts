/**
 * Lifecycle hook that is used for releasing a resource. It will be called automatically by DI container.
 */
interface Releasable {
    release(): void
}