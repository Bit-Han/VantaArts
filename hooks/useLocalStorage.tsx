"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const [isReady, setIsReady] = useState(false);

	// Load from localStorage AFTER mount (client only)
	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setStoredValue(JSON.parse(item));
			}
		} catch (error) {
			console.error("Error reading localStorage:", error);
		} finally {
			setIsReady(true);
		}
	}, [key]);

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				setStoredValue((prev) => {
					const valueToStore = value instanceof Function ? value(prev) : value;

					if (typeof window !== "undefined") {
						window.localStorage.setItem(key, JSON.stringify(valueToStore));
					}

					return valueToStore;
				});
			} catch (error) {
				console.error("Error saving to localStorage:", error);
			}
		},
		[key],
	);

	return [storedValue, setValue, isReady] as const;
}
