// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare const UtilCopyToClipboard: typeof import('./lib/components/util/CopyToClipboard.svelte')['default'];
declare const UiToast: typeof import('./lib/components/util/Toast.svelte')['default'];
declare const UiIcon: typeof import('./lib/components/ui/Icon.svelte')['default'];
declare const UiButton: typeof import('./lib/components/ui/Button.svelte')['default'];
declare const UiDropdown: typeof import('./lib/components/ui/Dropdown.svelte')['default'];

interface Window {
  ethereum: any;
}
