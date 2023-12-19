import type { StorageItemPromptConfig } from '../types/types';

export const getLocalStorageItemWithPrompt = ({
  localStorageKey,
  windowPrompt,
  defaultValue = '',
}: StorageItemPromptConfig): string => {
  let item = localStorage.getItem(localStorageKey) || defaultValue;

  while (!item) {
    const newItem = window.prompt(windowPrompt);

    if (newItem) {
      item = newItem;
    } else {
      alert('Please enter a valid value.');
    }
  }

  localStorage.setItem(localStorageKey, item);
  return item;
};
