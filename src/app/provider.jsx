'use client';

import { NextUIProvider } from '@nextui-org/react';
import './main.css';

export function Provider({ children }) {
	return <NextUIProvider>{children}</NextUIProvider>;
}
